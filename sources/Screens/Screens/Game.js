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

cc.Game = Screen.extend({

  /**
   *
   * 
   *
   */
  ctor: function(action) {
    this._super();

    /**
     *
     * Create singleton method.
     *
     */
    Game = this;

    /**
     *
     * Setting properties.
     *
     */
    this.complete = false;
    this.parameters = {
      state: false,
      type: false,
      stack: {
        pushed: [],
        current: false
      },
      echo: {
        last: 0,
        time: 10 * 1000
      }
    };
    this.setupFpsCounter();

    /**
     *
     * Start loading game.
     *
     */
    if(!cc.Game.loaded) {
      this.parameters.state = cc.Game.states.animation;

      /**
       *
       * Start loading resources wich need for loading animation.
       *
       */
      cc.loader.load(Resources(resources.loading), function() {}, function() {
        new cc.View1;

        /**
         *
         * Start loading main resources.
         *
         */
        cc.loader.load(Resources(resources.main), function(result, count, complete) {

          /**
           *
           * Update loading text.
           *
           */
          var percent = ((complete + 1) / count * 100) | 0;

          View1.decoration2.setPreferredWidth(percent);
          View1.text1.format([(complete + 1), count]);
        }.bind(this), function() {
          var updater = function() {
            var percent = View1.decoration2.getPreferredWidth();

            if(percent < 100) {
              View1.decoration2.setPreferredWidth(percent + 0.5);
            }
          }.bind(this);

          /**
           *
           * Checking updates.
           *
           */
          Updater.setup({
            updater: {
              scene: this,
              text: View1.text1,
              picture: View1.decoration2
            },
            start: function() {
              View1.decoration2.setPreferredWidth(0);
              View1.text1.setText('loading-2');
            }.bind(this),
            finish: function() {
              View1.decoration2.setPreferredWidth(100);

              /**
               *
               * Verify account.
               *
               */
              User.setup({
                updater: this,
                start: function() {
                  View1.decoration2.setPreferredWidth(0);
                  View1.text1.setText('loading-3');
                }.bind(this),
                finish: function() {
                  View1.decoration2.setPreferredWidth(100);

                  /**
                   *
                   * Connecting to the server.
                   *
                   */
                  Network.setup({
                    updater: this,
                    start: function() {
                      View1.decoration2.setPreferredWidth(0);
                      View1.text1.setText('loading-4');
                    }.bind(this),
                    finish: function() {
                      View1.decoration2.setPreferredWidth(100);

                      /**
                       *
                       *
                       *
                       */
                      this.completed(true);
                    }.bind(this),
                    update: updater});
                }.bind(this),
                update: updater});
            }.bind(this),
            update: updater});
        }.bind(this));
      }.bind(this));
    } else {
      this.completed(action);
    }
  },

  /**
   *
   * 
   *
   */
  setupFpsCounter: function() {
    this.frames = new Text('frames', this, Text.position.left);
    this.frames.create().attr({
      up: 0,
      x: Camera.c(3).x,
      y: Camera.height - Camera.c(5).y,

      zIndex: 1000
    });
    this.frames.update = function(time) {
      this.up += time;

      if(this.up >= 0.5) {
        this.up = 0;
        this.format([1.0 / cc.director.getDeltaTime() | 2]);
      }
    };
  },

  /**
   *
   * 
   *
   */
  onShow: function() {
    this._super();
  },
  onHide: function() {
    this._super();
  },

  /**
   *
   * 
   *
   */
  completed: function(action) {
    if(!cc.Game.loaded) {
      if(this.complete) {
        View1.remove();
      } else {
        if(action === true) {
          this.complete = true;
        }
      }
    }
  },
  restart: function(menu) {
    // TODO: Remove to the own class.
    this.splash = new BackgroundColor(this, cc.color.WHITE);
    this.splash.attr({
      opacity: 0,
      zIndex: cc.Game.layers.top
    });
    this.splash.runAction(
      cc.Sequence.create(
        cc.FadeIn.create(0.2),
        cc.DelayTime.create(0.2),
        cc.CallFunc.create(function() {
          Game.run(menu);
        }.bind(this.splash)),
        cc.FadeOut.create(0.1),
        cc.CallFunc.create(function() {
          this.destroy(Entity.destroy.complete);
        }.bind(this.splash))
      )
    );
  },

  /**
   *
   * 
   *
   */
  run: function(menu) {

    /**
     *
     * Enable music.
     *
     */
    Music.play(resources.main.music1, true);

    /**
     *
     * Reset properties.
     *
     */
    this.speed = Camera.s(250);
    this.time = 1;
    this.score = 0;

    if(cc.Game.created) {

      /**
       *
       * Clear properties.
       *
       */
      this.generator.clear();
      this.particles1.clear();
      this.particles2.clear();

      if(menu === true) {
        this.changeState(cc.Game.states.animation);
        View2.show();
      }

      if(menu === false) {
        this.changeState(cc.Game.states.prepare);
        this.onPrepare(true);
      }
    } else {
      cc.Game.created = true;

      /**
       *
       * Create views.
       *
       */
     /* new cc.View3;
      new cc.View4;
      new cc.View5;
      new cc.View6;
      new cc.View7;*/

      /**
       *
       * Setting properties.
       *
       */
      this.generator = new Generator(this);

      this.particles1 = new Manager(100, new Car.Particle1(), this, true, cc.Game.layers.particles1);
      this.particles2 = new Manager(100, new Car.Particle2(), this, true, cc.Game.layers.particles2);

      this.player = new Player(this.generator.holders.cars);

      this.generator.create();
    }

    this.player.create().attr({
        x: -this.player.getWidth() / 2,
        y: Camera.center.y - Camera.c(10).y
    });
    this.player.runAction(
      cc.EaseSineOut.create(
        cc.MoveTo.create(1.0, cc.p(this.player.getWidth(), Camera.s(cc.Game.positions[2])))
      )
    );
  },

  /**
   *
   * 
   *
   */
  onKeyBack: function() {
    if(this._super()) {
      if(this.parameters.stack.current.onBack) {
        if(this.parameters.stack.current.onBack()) {
          this.onBack();
        }

        return;
      }

      this.onBack();
    }
  },
  onKeyEscape: function() {
    this.onKeyBack();
  },
  onKeyUp: function() {
    this.onSwipeUp();
  },
  onKeyDown: function() {
    this.onSwipeDown();
  },
  onKeLeft: function() {
    this.onSwipeLeft();
  },
  onKeyRight: function() {
    this.onSwipeRight();
  },
  onKeySpace: function() {
    this.onTouch();
  },
  onSwipe: function(touch, e) {
    switch(this.parameters.state) {
      case cc.Game.states.prepare:
      this.changeState(cc.Game.states.running);
      return true;
      case cc.Game.states.running:
      return this.player.getNumberOfRunningActions() < 1;
    }

    return false;
  },
  onSwipeUp: function() {
    if(this.parameters.state === cc.Game.states.running) {
      this.player.onSwipeUp();
    }

    Sound.play(resources.sound.skid[0].random());

    Vibrator.vibrate(5);
  },
  onSwipeDown: function() {
    if(this.parameters.state === cc.Game.states.running) {
      this.player.onSwipeDown();
    }

    Sound.play(resources.sound.skid[0].random());

    Vibrator.vibrate(5);
  },
  onSwipeRight: function() {
    if(this.parameters.state === cc.Game.states.running) {
      this.player.onSwipeRight();

      Sound.play(resources.sound.skid[0].random());

      Vibrator.vibrate(5);
    }
  },
  onSwipeLeft: function() {
    if(this.parameters.state === cc.Game.states.running) {
      this.player.onSwipeLeft();

      Sound.play(resources.sound.skid[0].random());

      Vibrator.vibrate(5);
    }
  },
  onTouch: function() {
    switch(this.parameters.state) {
      case cc.Game.states.prepare:
      this.changeState(cc.Game.states.running);
      break;
    }
  },

  /**
   *
   * 
   *
   */
  onPrepare: function(restart) {

    /**
     *
     * Clear views stack.
     *
     */
    this.parameters.stack = {
      pushed: [],
      current: false
    };

    /**
     *
     * Hide ads.
     *
     */
    Ad.Admob.hide(cc.Ad.Banner, {
      success: function() {
        cc.Game.ad.banner = false;
      }
    });

    /**
     *
     *
     *
     */
    this.counter.setText('tap-to-ready');
    this.counter.attr({
      x: Camera.center.x,
      y: Camera.center.y * 1.4,

      zIndex: cc.Game.layers.top
    });

    this.counter.onCreate = function() {
      this.runAction(
        cc.RepeatForever.create(
          cc.Sequence.create(
            cc.Show.create(),
            cc.DelayTime.create(1.0),
            cc.Hide.create(),
            cc.DelayTime.create(0.5)
          )
        )
      );
    };
    this.name.runAction(
      cc.Sequence.create(
        cc.EaseSineOut.create(
          cc.MoveTo.create(0.5, cc.p(Camera.center.x, Camera.center.y * 3))
        ),
        cc.CallFunc.create(this.counter.create, this.counter)
      )
    );

    /**
     *
     *
     *
     */
    this.player.runAction(
      cc.MoveTo.create(0.5, {
        x: this.player.x,
        y: Camera.s(cc.Game.positions[2])
      })
    );

    Sound.play(resources.main.start);
  },
  onFinish: function() {
    Sound.play(resources.main.crash01);

    Game.speed = 0;

    this.counter.runAction(
      cc.Sequence.create(
        cc.DelayTime.create(1.0),
        cc.MoveTo.create(0.5, cc.p(Camera.center.x, Camera.height + this.counter.getHeightScaled())),
        cc.CallFunc.create(function() {
          Finish.show(Game);

          /**
           *
           * Show ads.
           *
           */
          if(++cc.Game.finishs.count > 3) {
            Ad.Admob.show(cc.Ad.Interstitial);

            cc.Game.finishs.count = 0;
          } else {
            Ad.Admob.show(cc.Ad.Banner, {
              success: function() {
                cc.Game.ad.banner = true;
              }.bind(this),
              error: function() {
                cc.Game.ad.banner = false;
              }
            });
          }
        })
      )
    );

    /**
     *
     * Work with network.
     *
     */
    Network.send('echo', {
      score: this.score
    });

    /**
     *
     * Work with api.
     *
     */
    this.buttle.score = this.score;
    this.buttle.time = now() - this.buttle.time;
    this.buttle.winner = Data.get(false, properties.info.uid);

    Api.call('buttles.send', this.buttle);
  },
  onRunning: function() {
    if(this.name.getNumberOfRunningActions() > 0) {
      this.parameters.state = cc.Game.states.prepare;

      return false;
    };

    this.counter.stopAllActions();
    this.counter.setVisible(true);
    this.counter.setText('counter');

    /**
     *
     * Work with api.
     *
     */
    this.buttle = {
      type: 1,
      time: now(),
      participants: [
        Data.get(false, properties.info.uid)
      ],
      winner: false,
      score: 0
    };
  },
  onAnimation: function() {
    this.name.runAction(
      cc.Sequence.create(
        cc.EaseSineOut.create(
          cc.MoveTo.create(0.5, cc.p(Camera.center.x, Camera.center.y * 1.4))
        )
      )
    );

    this.player.stopAllActions();
    this.player.runAction(
      cc.EaseCubicActionOut.create(
        cc.MoveTo.create(1.0, {
          x: this.player.getWidth(),
          y: Camera.center.y - Camera.c(10).y
        })
      )
    );
  },
  onStore: function() {
    this.player.stopAllActions();
    this.player.runAction(
      cc.RepeatForever.create(
        cc.Sequence.create(
          cc.DelayTime.create(1.0)
        )
      )
    );
    this.player.runAction(
      cc.EaseCubicActionOut.create(
        cc.MoveTo.create(1.0, {
          x: Camera.center.x,
          y: Camera.center.y - Camera.c(10).y
        })
      )
    );
  },

  /**
   *
   * 
   *
   */
  onBack: function(force) {
    if(!force) {
      if(this.parameters.stack.current.onBack) {
        if(!this.parameters.stack.current.onBack()) {
          return false;
        }
      }
    }

    this.changeView();
  },
  onPlay: function() {
    this.changeView(View2, View4);
  },
  onShop: function() {
    this.changeView(View2, View7);
  },
  onRate: function() {
    Media.openStore();
  },
  onMore: function() {
    this.changeView(View2, View3);
  },
  onPlaySingle: function() {
    this.changeView(View4, View6);
  },
  onPlayOnline: function() {
    if(Facebook.signed()) {
      Online.show(this);
    } else {
      Enter.show(this);
    }
  },
  onPlayArcade: function() {
    this.parameters.type = cc.Game.types.arcade;

    this.changeView(View6);
    this.changeState(cc.Game.states.prepare);
  },
  onPlaySurvival: function() {
    this.parameters.type = cc.Game.types.survival;

    this.changeView(View6);
    this.changeState(cc.Game.states.prepare);
  },
  onSettings: function() {
    this.changeView(View3, View5);
  },
  onMenu: function() {
    this.restart(true);
  },
  onRestart: function() {
    this.restart(false);
  },
  onScores: function() {
  },
  onSound: function() {
    if(Music.enabled || Sound.enabled) {
      Music.changeState(false);
      Sound.changeState(false);

      View5.button2.setText('sound-off');
    } else {
      Music.changeState(true);
      Sound.changeState(true);

      View5.button2.setText('sound-on');
    }
  },
  onVibrate: function() {
    View5.button3.setText('vibrate-' + (Vibrator.changeState() ? 'on' : 'off'));
  },
  onLanguage: function() {
    this.language = false;
    Language.next({
      start: function(callback, support) {
        this.language = support;

        callback();
      }.bind(this),
      finish: function() {
        View5.button1.setText('language-' + this.language.iso);
      }.bind(this)
    });
  },

  /**
   *
   * 
   *
   */
  onCounter: function() {
    Sound.play(resources.main.counter);

    this.score++;

    this.counter.stopAllActions();
    this.counter.setScale(cc.director.getContentScaleFactor());
    this.counter.runAction(
      cc.Sequence.create(
        cc.ScaleTo.create(0.1, cc.director.getContentScaleFactor() + 0.1),
        cc.ScaleTo.create(0.0, cc.director.getContentScaleFactor())
      )
    );
  },

  /**
   *
   * 
   *
   */
  changeView: function(view1, view2) {
    var reverse = false;
    var stack = this.parameters.stack;

    if(!view1 && !view2) {
      if(stack.pushed.length < 1) return false;

      view1 = stack.current;
      view2 = stack.pushed.last();

      stack.pushed.pop();

      view1.push--;
      view2.push--;

      reverse = true;
    }

    if(view1) view1.stopAllActions();
    if(view2) view2.stopAllActions();

    if(view1) {
      view1.runAction(
        cc.Sequence.create(
            cc.MoveTo.create(0.1, {x: Camera.width * (view1.push >= 1 ? -1 : 1), y: 0}),
            cc.CallFunc.create(view1.close, view1)
        )
      );
    }

    if(view2) {
      view2.open();
      view2.runAction(
        cc.Sequence.create(
          cc.EaseElasticOut.create(
            cc.MoveTo.create(1.2, {x: 0, y: 0})
          )
        )
      );
    }

    if(view1) if(view1.shadow) view1.shadow.runAction(cc.FadeTo.create(0.6, 0));
    if(view2) if(view2.shadow) view2.shadow.runAction(cc.FadeTo.create(0.6, 150));

    stack.current = view2;
    if(!reverse) {
      stack.pushed.push(view1);

      if(view1) view1.push++;
      if(view2) view2.push++;
    }

    Sound.play(resources.main.change);
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
      case cc.Game.states.prepare:
      this.onPrepare();
      break;
      case cc.Game.states.running:
      this.onRunning();
      break;
      case cc.Game.states.finish:
      this.onFinish();
      break;
      case cc.Game.states.animation:
      this.onAnimation();
      break;
      case cc.Game.states.store:
      this.onStore();
      break;
    }
  },
  updatePrepare: function(time) {
  },
  updateRunning: function(time) {
    Game.speed += Camera.s(0.5 * time);

    this.counter.format([this.score]);
  },
  updateFinish: function(time) {
  },

  /**
   *
   * 
   *
   */
  updateStates: function(time) {
    switch(this.parameters.state) {
      case cc.Game.states.prepare:
      this.updatePrepare(time);
      break;
      case cc.Game.states.running:
      this.updateRunning(time);
      break;
      case cc.Game.states.finish:
      this.updateFinish(time);
      break;
    }
  },
  update: function(time) {
    this._super(time);

    this.updateStates(time);
  }
});

cc.Game.states = {
  animation: 1,
  prepare: 2,
  running: 3,
  finish: 4,
  store: 5
};

cc.Game.types = {
  arcade: 1,
  survival: 2
};

cc.Game.layers = {
  road: 10,
  cars: 50,
  particles1: 70,
  particles2: 20,
  views: 100,
  top: 10000
};

cc.Game.ad = {
  banner: false,
  Intersstitial: false
};

cc.Game.finishs = {
  count: 0
};

cc.Game.positions = [
  98.5,
  112.5,
  130.5,
  149.4,
  165.5,
  181.5
];

cc.Game.loaded = false;
cc.Game.created = false;
cc.Game.onStart = function() {
  cc.Game.loaded = true;

  Finish = new cc.Finish;
  Enter = new cc.Enter;
  Online = new cc.Online;
};
