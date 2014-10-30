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

// TODO: Make extends from cc.SpriteBatchNode.
Generator = Entity.extend({

  /**
   *
   * 
   *
   */
  ctor: function(parent) {
    this._super(false, parent);

    /**
     *
     * Setting properties.
     *
     */
    this.holder = parent;
  },

  /**
   *
   * 
   *
   */
  onCreate: function() {
    this._super();

    this.donators = {
      road: [
        new Manager(2, new Road(resources.main.backgroundDecoration2), this, false, cc.Game.layers.road),
        new Manager(2, new Road(resources.main.backgroundDecoration3), this, false, cc.Game.layers.road),
        new Manager(2, new Road(resources.main.backgroundDecoration4), this, false, cc.Game.layers.road)
      ],
      cars: [
        new Manager(2, new Car(resources.main.car2), this, false, cc.Game.layers.cars),
        new Manager(2, new Car(resources.main.car3), this, false, cc.Game.layers.cars),
        new Manager(2, new Car(resources.main.car4), this, false, cc.Game.layers.cars),
        new Manager(2, new Car(resources.main.car5), this, false, cc.Game.layers.cars),
        new Manager(2, new Car(resources.main.car6), this, false, cc.Game.layers.cars),
        new Manager(2, new Car(resources.main.car7), this, false, cc.Game.layers.cars),
        new Manager(2, new Car(resources.main.car8), this, false, cc.Game.layers.cars)
      ]
    };
  },
  onDestroy: function() {
    this._super();
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
  findRoad: function(callbacks) {
    var count = 0;
    var max = {
      element: false,
      x: -1
    };

    this.getChildren().each(function(element) {
      if(element instanceof Road) {
        if(element.created) {
          count++;

          if(element.getPosition().x > max.x) {
            max = {
              element: element,
              x: element.getPosition().x
            };
          }
        }
      }
    });

    /**
     *
     * Generator is empty.
     *
     */
    if(max.x === -1 && count < 1) {
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
    var count = 0;

    var cars = [];
    this.getChildren().each(function(element) {
      if(element instanceof Car) {
        if(element.created) {
          count++;

          element.collide = false;

          cars.push(element);
        }
      }
    });

    var y = this.findCarPosition();

    if(count < (Game.parameters.state === cc.Game.states.animation ? 2 : 5) && y) { // TODO: Adjust difficult level.
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

    /**
     *
     * Need to sort all cars by y.
     *
     */
    this.sortCars(cars);

    /**
     *
     * Find collissions.
     *
     */
    this.intersectCars(cars);
  },
  sortCars: function(cars) {
    var zindex = cc.Game.layers.cars;
    cars.sort(function(element1, element2) {
      var y1 = element1.getPosition().y;
      var y2 = element2.getPosition().y;

      return y2 - y1;
    });
    cars.each(function(element) {
      element.setLocalZOrder(zindex++);
    }.bind(this));
  },
  intersectCars: function(cars) {
    cars.each(function(element1) {
      var next = cars.slice(0);

      this.counterCars(element1);

      next.remove(element1);
      next.each(function(element2) {
        if(element1.collideWidth(element2)) {
          element1.collide = element2;
        }
      }.bind(this));

      if(element1.collide) {
        element1.onCollide(element1, element1.collide);
      }
    }.bind(this));
  },
  counterCars: function(car) {
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
  findCarPosition: function(attempt) {
    attempt = attempt ? ++attempt : 1;

    var candidate = random(Camera.center.y / 2, Camera.height - Camera.center.y / 2);
    var clear = true;

    this.getChildren().each(function(element) {
      if(clear) {
        if(element instanceof Car) {
          if(element.created && !element.parameters.management) {
            if(Math.abs(candidate - element.getPosition().y) < element.getHeight()) {
              clear = false;
            }
          }
        }
      }
    });

    return clear ? candidate : (attempt > 10 ? false : this.findCarPosition(attempt));
  },

  /**
   *
   * 
   *
   */
  updatePrepare: function(time) {
    var donator = this.donators.road[2];

    /**
     *
     * Finding road.
     *
     */
    this.findRoad({
      empty: function() {
        donator.create().setPosition(Camera.center.x, Camera.center.y);
      }.bind(this),
      create: function(element) {
        donator.create().setPosition(element.getPosition().x + element.getWidth() / 2 + donator.last().getWidth() / 2, Camera.center.y);
        donator.last().update(0.02);
      }.bind(this)
    });

    var cars = [];
    this.getChildren().each(function(element) {
      if(element instanceof Car) {
        if(element.created) {
          element.collide = false;

          cars.push(element);
        }
      }
    });
    this.sortCars(cars);
    this.intersectCars(cars);
  },
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
      this.updatePrepare(time);
      break;
      case cc.Game.states.running:
      case cc.Game.states.animation:
      this.updateRunning(time);
      break;
    }
  },
  update: function(time) {
    this._super(time);

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
