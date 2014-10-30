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

Car = AnimatedEntity.extend({

  /**
   *
   * 
   *
   */
  ctor: function(file, parent) {
    this._super(file, 1, 2, parent);

    /**
     *
     * Setting properties.
     *
     */
    this.type = file;
    this.swipe = Camera.coord(15);

    this.particles1 = Game.particles1;
    this.particles2 = Game.particles2;

    /**
     *
     *
     *
     */
    this.setAliasTexParameters();
  },

  /**
   *
   * 
   *
   */
  onCreate: function() {
    this._super();

    this.parameters = {
      management: false,
      countered: false,
      state: false,
      repair: random(10, 100),
      speed: {
        x: Camera.coord(random(-200.0, -50.0)),
        y: Camera.coord(random(-2.0, 2.0))
      },
      crash: false
    };
    this.changeState(Car.states.move);

    this.setRotation(0);
  },
  onDestroy: function() {
    this._super();
  },

  /**
   *
   * 
   *
   */
  setManagement: function(management) {
    this.parameters.management = management;

    if(management) {
      this.parameters.speed = {
        x: 0,
        y: 0
      };
    }
  },

  /**
   *
   * 
   *
   */
  move: function(time) {
    var x = this.x - this.parameters.speed.x * time - (this.parameters.management ? 0 : Game.speed) * time;
    var y = this.y - this.parameters.speed.y * time;

    if(this.parameters.management && this.getNumberOfRunningActions() < 1) {
      if(Game.parameters.state === cc.Game.states.animation || Game.parameters.state === cc.Game.states.prepare) {
        var c = Camera.center.y - Camera.coord(10);
        if(y > c || y < c) {
          y += Camera.coord(y > c ? -0.1 : 0.1);
        }
      }
    }

    if(!this.parameters.management && x < -this.getWidth() / 2) {
      this.destroy();
    } else {
      this.x = x;
      this.y = y;
    }

    this.effect1();
  },

  /**
   *
   * 
   *
   */
  effect1: function() {
    if(this.getNumberOfRunningActions() > 0) {
      this.particles2.create().attr({x: this.x, y: this.y});
      this.particles2.create().attr({x: this.x, y: this.y - this.getHeight() / 3});
    }
  },
  effect2: function() {
    if(this.getNumberOfRunningActions() > 0 || probably(20)) {
      var x = this.getPosition().x;
      var y = this.getPosition().y;

      this.particles1.create().setPosition(cc.p(x + this.getWidth() / 4, y));
    }
  },

  /**
   *
   * 
   *
   */
  onStop: function() {
    this.finishAnimation();

    this.parameters.speed = {
      x: 0,
      y: 0
    };
  },
  onMove: function() {
    this.animate(0.2);
  },
  onSkid: function() {
  },
  onCrash: function() {
    if(this.parameters.management) {
      if(Game.parameters.state === cc.Game.states.animation || Game.parameters.state === cc.Game.states.prepare) {
        this.changeState(Car.states.move);

        var length = Math.sqrt(this.parameters.crash.x * this.parameters.crash.x + this.parameters.crash.y * this.parameters.crash.y);

        this.parameters.crash.x /= length;
        this.parameters.crash.y /= length;

        this.parameters.crash.x *= Camera.coord(1);
        this.parameters.crash.y *= Camera.coord(1);

        var x = this.getPosition().x;
        var y = this.getPosition().y + this.parameters.crash.y;

        this.runAction(
          cc.EaseCubicActionOut.create(
            cc.MoveTo.create(0.7, cc.p(x, y))
          )
        );
        this.runAction(
          cc.Sequence.create(
            cc.RotateTo.create(0.3, random(0, 5) * (this.parameters.crash.y > 0 ? -1 : 1)),
            cc.RotateTo.create(0.2, 0)
          )
        );

        return true;
      }

      Game.changeState(cc.Game.states.finish);
    }

    this.onStop();

    if(this.parameters.crash) {
      var length = Math.sqrt(this.parameters.crash.x * this.parameters.crash.x + this.parameters.crash.y * this.parameters.crash.y);

      this.parameters.crash.x /= length;
      this.parameters.crash.y /= length;

      this.parameters.crash.x *= Camera.coord(this.parameters.management ? 10 : (Game.parameters.state === cc.Game.states.animation || Game.parameters.state === cc.Game.states.prepare ? 150 : 50));
      this.parameters.crash.y *= Camera.coord(this.parameters.management ? 10 : (Game.parameters.state === cc.Game.states.animation || Game.parameters.state === cc.Game.states.prepare ? 150 : 50));

      var x = this.getPosition().x + this.parameters.crash.x;
      var y = this.getPosition().y + this.parameters.crash.y;

      this.runAction(
        cc.EaseCubicActionOut.create(
          cc.MoveTo.create(0.7, cc.p(x, y))
        )
      );
      this.runAction(
        cc.RotateTo.create(0.7, random(0, 10) * (this.parameters.crash.y > 0 ? -1 : 1))
      );
    } else {
      // Low repair.
    }
  },

  /**
   *
   * 
   *
   */
  changeState: function(state) {
    if(this.parameters.state === state) return false;

    this.parameters.state = state;
    switch(this.parameters.state) {
      case Car.states.stop:
      this.onStop();
      break;
      case Car.states.move:
      this.onMove();
      break;
      case Car.states.skid:
      this.onSkid();
      break;
      case Car.states.crash:
      this.onCrash();
      break;
    }
  },
  updateStop: function(time) {
  },
  updateMove: function(time) {
    return this.move(time);

    /**
     *
     * Repair must be greather than 1% otherwise it's a crash.
     *
     */
    /*this.parameters.repair -= 10 * time;

    if(this.parameters.repair < 50) {
      // TODO: Add some animation.
    }

    if(this.parameters.repair < 1) {
      this.parameters.speed.x += Camera.coord(100) * time;
      this.parameters.speed.y = 0;

      if(this.parameters.speed.x > 0) {
        this.changeState(Car.states.crash);

        if(this.parameters.management) {
          // TODO: It's mean that Game is lose.
        }
      }
    }*/
  },
  updateSkid: function(time) {
  },
  updateCrash: function(time) {
    this.move(time);

    this.effect2();
  },

  /**
   *
   * 
   *
   */
  updateStates: function(time) {
    switch(this.parameters.state) {
      case Car.states.stop:
      this.updateStop(time);
      break;
      case Car.states.move:
      this.updateMove(time);
      break;
      case Car.states.skid:
      this.updateSkid(time);
      break;
      case Car.states.crash:
      this.updateCrash(time);
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
  onSwipeUp: function() {
    var x = this.getPosition().x;
    var y = this.getPosition().y + this.swipe;

    this.runAction(
      cc.EaseSineOut.create(
        cc.MoveTo.create(0.2, cc.p(x, y))
      )
    );
    this.runAction(
      cc.Sequence.create(
        cc.RotateTo.create(0.1, -10),
        cc.RotateTo.create(0.1, 0)
      )
    );
  },
  onSwipeDown: function() {
    var x = this.getPosition().x;
    var y = this.getPosition().y - this.swipe;

    this.runAction(
      cc.EaseSineOut.create(
        cc.MoveTo.create(0.2, cc.p(x, y))
      )
    );
    this.runAction(
      cc.Sequence.create(
        cc.RotateTo.create(0.1, 10),
        cc.RotateTo.create(0.1, 0)
      )
    );
  },
  onSwipeRight: function() {
    // TODO: Check available.
    // TODO: Add wind animation.
    var x = this.getPosition().x + this.swipe;
    var y = this.getPosition().y;

    this.runAction(
      cc.EaseSineOut.create(
        cc.MoveTo.create(0.2, cc.p(x, y))
      )
    );
    this.runAction(
      cc.Sequence.create(
        cc.ScaleTo.create(0.1, 1.2, 1.0),
        cc.ScaleTo.create(0.1, 1.0)
      )
    );

    Game.speed += Camera.coord(1);
  },
  onSwipeLeft: function() {
    // TODO: Check available.
    var x = this.getPosition().x - this.swipe;
    var y = this.getPosition().y;

    this.runAction(
      cc.EaseSineOut.create(
        cc.MoveTo.create(0.3, cc.p(x, y))
      )
    );
  },

  /**
   *
   * 
   *
   */
  getBoundingBoxToWorld: function() {
    return cc.rectApplyAffineTransform(cc.rect(0, this.frames.height / 4, this.frames.width, this.frames.height / 2), this.getNodeToWorldTransform());
  },

  /**
   *
   * 
   *
   */
  onCollide: function(element1, element2) {
    element1.parameters.crash = {
      x: Math.abs(element1.getPosition().x - element2.getPosition().x),
      y: element1.getPosition().y - element2.getPosition().y
    };
    element2.parameters.crash = {
      x: Math.abs(element2.getPosition().x - element1.getPosition().x),
      y: element2.getPosition().y - element1.getPosition().y
    };

    element1.changeState(Car.states.crash);
    element2.changeState(Car.states.crash);
  },

  /**
   *
   * 
   *
   */
  deepCopy: function() {
    return new Car(this.type);
  }
});

Car.states = {
  stop: 0,
  move: 1,
  skid: 2,
  crash: 3
};

Car.Particle1 = Entity.extend({

  /**
   *
   * 
   *
   */
  ctor: function() {
    this._super(resources.main.particle1);

    /**
     *
     *
     *
     */
    this.setAliasTexParameters();
  },

  /**
   *
   * 
   *
   */
  onCreate: function() {
    this._super();

    this.speed = {
      x: Camera.coord(random(-10, 10)),
      y: Camera.coord(random(1, 10))
    };
    this.time = {
      total: 1.0,
      elapsed: 0
    };
    this.setScale(random(0.1, 1.0));
  },
  onDestroy: function() {
    this._super();
  },

  /**
   *
   * 
   *
   */
  update: function(time) {
    this._super(time);

    this.time.elapsed += time;
    if(this.time.elapsed >= this.time.total) {
      this.destroy();
    } else {
      var x = this.getPosition().x + this.speed.x * time;
      var y = this.getPosition().y + this.speed.y * time;

      this.setPosition(cc.p(x, y));
    }
  },

  /**
   *
   * 
   *
   */
  deepCopy: function() {
    return new Car.Particle1();
  }
});

Car.Particle2 = Entity.extend({

  /**
   *
   * 
   *
   */
  ctor: function() {
    this._super(resources.main.particle2);

    /**
     *
     *
     *
     */
    this.setAliasTexParameters();
  },

  /**
   *
   * 
   *
   */
  onCreate: function() {
    this._super();
  },
  onDestroy: function() {
    this._super();
  },

  /**
   *
   * 
   *
   */
  update: function(time) {
    this._super(time);

    if(this.x < -this.getWidth() / 2) {
      this.destroy();
    } else {
      this.x -= Game.speed * time;
    }
  },

  /**
   *
   * 
   *
   */
  deepCopy: function() {
    return new Car.Particle2();
  }
});
