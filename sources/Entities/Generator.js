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

Generator = cc.SpriteBatchNode.extend({

  /**
   *
   * 
   *
   */
  ctor: function(parent) {
    this._super(resources.main.value1);

    /**
     *
     * Setting properties.
     *
     */
    this.holder = parent;

    /**
     *
     * Extend second class.
     *
     */
    Entity.prototype.ctor.call(this, false, parent, false, true);
  },

  /**
   *
   * 
   *
   */
  onCreate: function() {
    Entity.prototype.onCreate.call(this);

    this.donators = {
      road: [
        new Manager(2, new Road(resources.frames.backgroundDecoration2), this, false, cc.Game.layers.road),
        new Manager(2, new Road(resources.frames.backgroundDecoration3), this, false, cc.Game.layers.road),
        new Manager(2, new Road(resources.frames.backgroundDecoration4), this, false, cc.Game.layers.road)
      ],
      cars: [
        new Manager(2, new Car(resources.frames.car2), this, false, cc.Game.layers.cars),
        new Manager(2, new Car(resources.frames.car3), this, false, cc.Game.layers.cars),
        new Manager(2, new Car(resources.frames.car4), this, false, cc.Game.layers.cars),
        new Manager(2, new Car(resources.frames.car5), this, false, cc.Game.layers.cars),
        new Manager(2, new Car(resources.frames.car6), this, false, cc.Game.layers.cars),
        new Manager(2, new Car(resources.frames.car7), this, false, cc.Game.layers.cars),
        new Manager(2, new Car(resources.frames.car8), this, false, cc.Game.layers.cars)
      ]
    };
  },
  onDestroy: function() {
    Entity.prototype.onDestroy.call(this);
  },

  /**
   *
   * 
   *
   */
  onShow: function() {
  },
  onHide: function() {
  },

  /**
   *
   * 
   *
   */
  getAll: function(elements) {
    var result = [];
    for(var i = 0; i < elements.length; i++) {
      for(var j = 0; j < elements[i].count().count; j++) {
        result.push(elements[i].get(j));
      }
    }

    return result;
  },

  /**
   *
   * 
   *
   */
  findRoad: function(callbacks) {
    var max = {
      element: false,
      x: -1
    };

    var roads = this.getAll(this.donators.road);
    roads.each(function(element) {
      if(element.getPosition().x > max.x) {
        max = {
          element: element,
          x: element.getPosition().x
        };
      }
    });

    /**
     *
     * Generator is empty.
     *
     */
    if(max.x === -1 && roads.length < 1) {
      if(callbacks) {
        if(callbacks.empty) {
          callbacks.empty();
        }
      }
    }

    /**
     *
     * Need to create new part of road.
     *
     */
    else if(max.x < Camera.width) {
      if(callbacks) {
        if(callbacks.create) {
          callbacks.create(max.element);
        }
      }
    }
  },
  findCars: function(callbacks) {
    var cars = this.getAll(this.donators.cars).concat([Game.player]);

    var y = this.findCarPosition(cars);

    if(cars.length < (Game.parameters.state === cc.Game.states.animation ? 3 : 3) && y) { // TODO: Adjust difficult level.
      var donator = this.donators.cars.random();

      donator.create().attr({
        x: Camera.width + donator.last().getWidth(),
        y: y
      });

      if(callbacks) {
        if(callbacks.create) {
          callbacks.create(donator.last());
        }
      }

      cars.push(donator.last());
    }

    this.sortCars(cars);
  },
  sortCars: function(cars) {

    /**
     *
     * Need to sort all cars by y first.
     *
     */
    var zindex = cc.Game.layers.cars;
    cars.sort(function(element1, element2) {
      return (element2.y + element2.getHeight() / 2) - (element1.y + element2.getHeight() / 2);
    });

    /**
     *
     * Find collissions.
     *
     */
    cars.each(function(element1) {
      element1.setLocalZOrder(++zindex);

      this.counterCar(element1);

      cars.copy(element1).each(function(element2) {
        if(element1.collideWidth(element2)) {
          element1.collide = element2;
          element1.onCollide(element1, element2);
        }
      });
    }.bind(this));
    this.reorderBatch(true);
  },
  counterCar: function(car) {
    if(Game.parameters.state === cc.Game.states.running) {
      if(!car.parameters.countered) {
        if(car.getPosition().x < Game.player.getPosition().x) {
          car.parameters.countered = true;

          Game.onCounter();

          return true;
        }
      }
    }

    return false;
  },
  findCarPosition: function(cars, attempt) {
    attempt = attempt ? ++attempt : 1;

    var candidate = random(Camera.center.y / 2, Camera.height - Camera.center.y / 2);

    if(cars.length < 2 || cars.some(function(element) {
      if(element.created && !element.parameters.management) {
        if(Math.abs(candidate - element.y) > element.getHeight()) return true;
      }
    })) { return candidate; }

    return (attempt > 2 ? false : this.findCarPosition(cars, attempt));
  },

  /**
   *
   * 
   *
   */
  updateRunning: function(time) {
    var donator = Game.parameters.state === cc.Game.states.animation ? this.donators.road[2] : this.donators.road.random();

    /**
     *
     * Finding road.
     *
     */
    this.findRoad({
      empty: function() {
        donator.create().setPosition(Camera.center.x, Camera.center.y);
        donator.create().setPosition(Camera.center.x + donator.last().getWidth(), Camera.center.y);
      }.bind(this),
      create: function(element) {
        donator.create().setPosition(element.getPosition().x + element.getWidth() / 2 + donator.last().getWidth() / 2, Camera.center.y);
        donator.last().update(0.02);
      }.bind(this)
    });

    /**
     *
     * Creating new cars.
     *
     */
    this.findCars({
      create: function(element) {
        if(Game.parameters.state === cc.Game.states.animation) {
          element.parameters.countered = true;
        }
      }
    });
  },

  /**
   *
   * 
   *
   */
  updateStates: function(time) {
    switch(this.holder.parameters.state) {
      case cc.Game.states.prepare:
      case cc.Game.states.finish:
      case cc.Game.states.running:
      case cc.Game.states.animation:
      this.updateRunning(time);
      break;
    }
  },
  update: function(time) {
    this.updateStates(time);
  },

  /**
   *
   * 
   *
   */
  clear: function() {
    this.donators.cars.each(function(element) {
      element.clear();
    });
  }
});
