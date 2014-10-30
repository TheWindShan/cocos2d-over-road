/**
 * Tooflya Inc. Development
 *
 * @author Igor Mats from Tooflya Inc.
 * @copyright (c) 2014 by Igor Mats
 * http://www.tooflya.com/development/
 *
 *
 * License: Tooflya Inc. Software License v1.
 *
 * Licensee may not use this software for commercial purposes. For the purpose of this license,
 * commercial purposes means that a 3rd party has to pay in order to access Software or that
 * the Website that runs Software is behind a paywall. In consideration of the License granted
 * under clause 2, Licensee shall pay Licensor a fee, via Credit-Card, PayPal or any other
 * mean which Licensor may deem adequate. Failure to perform payment shall construe as material
 * breach of this Agreement. This software is provided under an AS-IS basis and without any support,
 * updates or maintenance. Nothing in this Agreement shall require Licensor to provide Licensee with
 * support or fixes to any bug, failure, mis-performance or other defect in The Software.
 *
 * @version of cocos2d is 3.1 Final
 *
 */

var modules = require("./modules.js");

var online = modules.online;
var rooms = modules.rooms;

/**
 *
 * Start server.
 * TODO: Add secure support when libwebsockets will be recompiled.
 *
 */
var io = require('socket.io').listen(8083, {
  log: false
});

/**
 *
 * Settings transports data.
 *
 */
io.set('transports', ['xhr-polling', 'websocket']);

/**
 *
 * Event on connection.
 *
 */
io.sockets.on('connection', function(socket) {

  /**
   *
   * When user initial setuping.
   *
   */
  socket.on('setup', function(data, callback) {
    socket.info = {
      personal: data
    };


    /**
     *
     * Updating online status.
     *
     */
    var users = [];
    io.sockets.clients().each(function(user) {
      if(user.info) {
        users.push(user.info.personal);
      }
    });

    io.sockets.emit('online', {
      online: {
        users: {
          count: ++online.users.count,
          add: users
        },
        battles: online.battles
      }
    });

    if(callback) {
      callback();
    }
  });

  /**
   *
   * When user subscribe.
   *
   */
  socket.on('subscribe', function(data, callback) {
    rooms.subscribe(socket, data, callback);

    if(callback) {
      callback();
    }
  });

  /**
   *
   * When user unsubscribe.
   *
   */
  socket.on('unsubscribe', function(data, callback) {
    rooms.leave(socket);

    if(callback) {
      callback();
    }
  });

  /**
   *
   * When user sending data.
   *
   */
  socket.on('data', function(data, callback) {
    if(socket.room) {
      socket.broadcast.to(socket.room).emit('data', data);

      if(callback) {
        callback();
      }
    }
  });

  /**
   *
   * When user someone sending message.
   *
   */
  socket.on('message', function(data, callback) {
    if(socket.room) {
      socket.broadcast.to(socket.room).emit('message', data);

      if(callback) {
        callback();
      }
    }
  });

  /**
   *
   * When user disconnected.
   *
   */
  socket.on('disconnect', function() {
    if(socket.info) {
      if(socket.info.personal) {

        /**
         *
         * Updating online status.
         *
         */
        io.sockets.emit('online', {
          online: {
            users: {
              count: --online.users.count,
              remove: socket.info.personal
            },
            battles: online.battles
          }
        });
      }
    }

    rooms.leave(socket);

    socket.connection.end();
  });
});
