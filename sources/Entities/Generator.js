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
    this.counter = 0;

    /**
     *
     *
     *
     */
    this.holders = {
      roads: new SpriteBatch(resources.main.value1, parent, 10, cc.Game.layers.road),
      cars:  new SpriteBatch(resources.main.value2, parent, 20, cc.Game.layers.cars)
    };

    /**
     *
     *
     *
     */
    this.donators = {
      road: [
        new Manager(2, new Road(resources.frames.backgroundDecoration2), this.holders.roads, false, cc.Game.layers.road),
        new Manager(2, new Road(resources.frames.backgroundDecoration3), this.holders.roads, false, cc.Game.layers.road),
        new Manager(2, new Road(resources.frames.backgroundDecoration4), this.holders.roads, false, cc.Game.layers.road)
      ],
      cars: [
        new Manager(2, new Car(resources.frames.car2), this.holders.cars, false, cc.Game.layers.cars),
        new Manager(2, new Car(resources.frames.car3), this.holders.cars, false, cc.Game.layers.cars),
        new Manager(2, new Car(resources.frames.car4), this.holders.cars, false, cc.Game.layers.cars),
        new Manager(2, new Car(resources.frames.car5), this.holders.cars, false, cc.Game.layers.cars),
        new Manager(2, new Car(resources.frames.car6), this.holders.cars, false, cc.Game.layers.cars),
        new Manager(2, new Car(resources.frames.car7), this.holders.cars, false, cc.Game.layers.cars),
        new Manager(2, new Car(resources.frames.car8), this.holders.cars, false, cc.Game.layers.cars)
      ]
    };

    /**
     *
     *
     *
     */
    this.timelaps = {
      car: {
        fire: false,
        time: 0.4,
        elapsed: 0
      }
    };
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

    this.sortRoads(this.getAll(this.donators.road));
  },
  findCars: function(callbacks) {
    var cars = this.getAll(this.donators.cars).concat([Game.player]);

    if(this.timelaps.car.fire) {
      var donator = this.donators.cars.random();

      donator.create().attr({
        x: Camera.width + donator.last().getWidth(),
        y: random(Camera.center.y - Camera.s(30), Camera.center.y + Camera.s(30))
      });

      if(callbacks) {
        if(callbacks.create) {
          if(Game.parameters.state !== cc.Game.states.prepare) {
            callbacks.create(donator.last());
          }
        }
      }

      cars.push(donator.last());

      this.timelaps.car.fire = false;
    }

    this.sortCars(cars);
  },
  sortRoads: function(roads) {

    /**
     *
     * Need to sort all roads by y.
     *
     */
    var zindex = cc.Game.layers.road;
    roads.sort(function(element1, element2) {
      return element2.x - element1.x;
    });

    roads.each(function(element1) {
      element1.setLocalZOrder(++zindex);
    });
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
    this.holders.cars.reorderBatch(true);
  },
  counterCar: function(car) {
    if(Game.parameters.state === cc.Game.states.running) {
      if(!car.parameters.countered) {
        if(car.getPosition().x < Game.player.getPosition().x) {
          car.parameters.countered = true;

          if(Game.parameters.type === cc.Game.types.survival || ++this.counter > 10) {
            this.counter = 0;

            Game.onCounter();

            return true;
          }
        }
      }
    }

    return false;
  },

  /**
   *
   * 
   *
   */
  updateCars: function(time) {

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
  updateRoads: function(time) {
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
  },
  updateRunning: function(time) {
    switch(Game.parameters.state) {
      case cc.Game.states.prepare:
      case cc.Game.states.running:
      case cc.Game.states.animation:
      this.updateCars(time);
      case cc.Game.states.store:
      this.updateRoads(time);
      break;
    }

    /**
     *
     * Counting time for creation a new elements.
     *
     */
    this.timelaps.car.elapsed += time;
    if(this.timelaps.car.elapsed >= this.timelaps.car.time) {
      this.timelaps.car.elapsed = 0;
      this.timelaps.car.fire = true;
    }
  },

  /**
   *
   * 
   *
   */
  updateStates: function(time) {
    switch(Game.parameters.state) {
      case cc.Game.states.prepare:
      case cc.Game.states.running:
      case cc.Game.states.animation:
      case cc.Game.states.store:
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
    this.counter = 0;

    this.donators.cars.each(function(element) {
      element.clear();
    });
  }
});
