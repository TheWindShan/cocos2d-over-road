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
      views: {
        view1: false,
        view2: false,
        view3: false,
        view4: false,
        view5: false,
        view6: false,

        stack: {
          pushed: [],
          current: false
        }
      }
    };

    if(!cc.Game.loaded) {
      this.parameters.state = cc.Game.states.animation;

      /**
       *
       * Start loading resources wich need for loading animation.
       *
       */
      cc.loader.load(Resources(resources.loading), function() {}, function() {
        this.createView1();

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

          this.decoration3.setPreferredWidth(percent);
          this.text1.format([(complete + 1), count]);
        }.bind(this), function() {
          var updater = function() {
            var percent = this.decoration3.getPreferredWidth();

            if(percent < 100) {
              this.decoration3.setPreferredWidth(percent + 0.5);
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
              text: this.text1,
              picture: this.decoration3
            },
            start: function() {
              this.decoration3.setPreferredWidth(0);
              this.text1.setText('loading-2');
            }.bind(this),
            finish: function() {
              this.decoration3.setPreferredWidth(100);

              /**
               *
               * Verify account.
               *
               */
              User.setup({
                updater: this,
                start: function() {
                  this.decoration3.setPreferredWidth(0);
                  this.text1.setText('loading-3');
                }.bind(this),
                finish: function() {
                  this.decoration3.setPreferredWidth(100);

                  /**
                   *
                   * Connecting to the server.
                   *
                   */
                  Network.setup({
                    updater: this,
                    start: function() {
                      this.decoration3.setPreferredWidth(0);
                      this.text1.setText('loading-4');
                    }.bind(this),
                    finish: function() {
                      this.decoration3.setPreferredWidth(100);

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
    if(cc.Game.loaded) {
      this.decoration1 = new Entity(resources.loading.decoration1, this);

      this.decoration1.setAliasTexParameters();
      this.decoration1.create().attr({
        x: Camera.center.x,
        y: Camera.center.y * 1.6,
        zIndex: cc.Game.layers.top
      });

      this.run();

      if(action) {
        this.parameters.state = cc.Game.states.animation;

        this.createView2(true);
      } else {
        this.parameters.state = cc.Game.states.prepare;

        this.onPrepare(true);
      }
    } else {
      if(this.complete) {
        cc.Game.onStart();

        this.decoration2.destroy(Entity.destroy.complete);

        this.text1.runAction(
          cc.Sequence.create(
            cc.EaseCubicActionOut.create(
              cc.MoveTo.create(1.0, cc.p(Camera.width + this.text1.getWidth(), this.text1.getPosition().y))
            ),
            cc.CallFunc.create(this.createView2, this)
          )
        );
        this.decoration3.runAction(
          cc.EaseCubicActionOut.create(
            cc.MoveTo.create(1.0, cc.p(-this.decoration3.getWidth(), this.decoration3.getPosition().y))
          )
        );
      } else {
        if(action === true) {
          this.complete = true;
        }
      }
    }
  },
  restart: function(menu) {
    Finish.hide();

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
          this.destroy(Entity.destroy.complete);

          Game.run(menu);
        }.bind(this.splash))
      )
    );
  },

  /**
   *
   * 
   *
   */
  createView1: function() {
    if(!this.parameters.views.view1) {
      new BackgroundColor(this, cc.color(199, 207, 162));

      this.background = new Entity(resources.loading.background, this, true);
      
      this.parameters.views.view1 = true;

      this.text1 = new Text('loading-1', this);
      this.text2 = new Text('tap-to-ready', this);
      this.text1.create().attr({
        x: Camera.center.x,
        y: Camera.center.y * 0.4 - Camera.c(5).y
      });
      this.text2.attr({
        x: Camera.center.x,
        y: Camera.center.y * 1.6,
        zIndex: cc.Game.layers.top
      });

      this.decoration1 = new Entity(resources.loading.decoration1, this);
      this.decoration2 = new AnimatedEntity(resources.loading.decoration2, 1, 2, this);
      this.decoration3 = new NineEntity(resources.loading.decoration3, this, 1, 1, 1, 1);

      this.background.setAliasTexParameters();
      this.decoration1.setAliasTexParameters();
      this.decoration2.setAliasTexParameters();
      this.decoration3.setAliasTexParameters();

      this.decoration1.create().attr({
        x: Camera.center.x,
        y: Camera.center.y * 1.6,
        zIndex: cc.Game.layers.top
      });
      this.decoration2.create().attr({
        x: -this.decoration2.getWidth() / 2,
        y: Camera.center.y
      });
      this.decoration2.animate(0.2);
      this.decoration2.runAction(
        cc.RepeatForever.create(
          cc.Sequence.create(
            cc.EaseCubicActionOut.create(
              cc.MoveTo.create(0.5, cc.p(Camera.center.x, Camera.center.y))
            ),
            cc.DelayTime.create(1.0),
            cc.EaseCubicActionOut.create(
              cc.MoveTo.create(0.5, cc.p(Camera.width + this.decoration2.getWidth() / 2, Camera.center.y))
            ),
            cc.DelayTime.create(1.0),
            cc.MoveTo.create(0.0, cc.p(-this.decoration2.getWidth() / 2, Camera.center.y)),
            cc.CallFunc.create(this.completed, this)
          )
        )
      );
      this.decoration3.create().attr({
        x: Camera.center.x - this.decoration3.getContentSize().width / 2,
        y: Camera.center.y * 0.5
      });
      this.decoration3.setAnchorPoint(cc.p(0.0, 0.5));
    }

    return this.parameters.views.view1;
  },
  createView2: function(restart) {
    if(!this.parameters.views.view2) {

      /**
       *
       * Show ads.
       *
       */
      if(!cc.Game.ad.banner) {
        Ad.Admob.show(cc.Ad.Banner, {
          success: function() {
            cc.Game.ad.banner = true;

            if(this.parameters.views.view3) {
              var y;

              switch(Orientation.orientation) {
                case Orientation.types.portrait:
                y = 20;
                break;
                case Orientation.types.landscape:
                y = 30;
                break;
              }

              this.parameters.views.view3.button1.y = Camera.c(y).y;
              this.parameters.views.view3.button2.y = Camera.c(y).y;
            }
          }.bind(this),
          error: function() {
            cc.Game.ad.banner = false;
          }
        });
      }

      this.parameters.views.view2 = new Background(this);
      this.parameters.views.view2.push = 1;

      if(!restart) {
        this.text1.destroy(Entity.destroy.complete);
        this.decoration3.destroy(Entity.destroy.complete);
        this.background.destroy(Entity.destroy.complete);
      }

      this.button1 = new Button(resources.main.button1, this.parameters.views.view2, 1, 1, 1, 2, this.onPlay.bind(this), 'play');
      this.button2 = new Button(resources.main.button1, this.parameters.views.view2, 1, 1, 1, 2, this.onPlay.bind(this), 'store');
      this.button3 = new Button(resources.main.button1, this.parameters.views.view2, 1, 1, 1, 2, this.onRate.bind(this), 'rate');
      this.button4 = new Button(resources.main.button1, this.parameters.views.view2, 1, 1, 1, 2, this.onMore.bind(this), 'more');

      this.button1.setOrientationConfig(new OrientationConfig({
        landscape: {
          y: Camera.s(10)
        }
      }));
      this.button2.setOrientationConfig(new OrientationConfig({
        landscape: {
          y: Camera.s(4)
        }
      }));
      this.button3.setOrientationConfig(new OrientationConfig({
        landscape: {
          y: -Camera.s(2)
        }
      }));
      this.button4.setOrientationConfig(new OrientationConfig({
        landscape: {
          y: -Camera.s(8)
        }
      }));

      this.button1.create().attr({x: Camera.center.x, y: -Camera.c(10, this.button1).y});
      this.button2.create().attr({x: Camera.center.x, y: -Camera.c(10, this.button2).y});
      this.button3.create().attr({x: Camera.center.x, y: -Camera.c(10, this.button3).y});
      this.button4.create().attr({x: Camera.center.x, y: -Camera.c(10, this.button4).y});

      this.button1.setAliasTexParameters();
      this.button2.setAliasTexParameters();
      this.button3.setAliasTexParameters();
      this.button4.setAliasTexParameters();

      this.button1.runAction(
        cc.EaseCubicActionOut.create(
          cc.MoveTo.create(1.0, cc.p(Camera.center.x, Camera.center.y - Camera.c(0, this.button1).y))
        )
      );
      this.button2.runAction(
        cc.Sequence.create(
          cc.DelayTime.create(0.5),
          cc.EaseCubicActionOut.create(
            cc.MoveTo.create(1.0, cc.p(Camera.center.x, Camera.center.y - Camera.c(20, this.button2).y))
          )
        )
      );
      this.button3.runAction(
        cc.Sequence.create(
          cc.DelayTime.create(1.0),
          cc.EaseCubicActionOut.create(
            cc.MoveTo.create(1.0, cc.p(Camera.center.x, Camera.center.y - Camera.c(40, this.button3).y))
          )
        )
      );
      this.button4.runAction(
        cc.Sequence.create(
          cc.DelayTime.create(1.5),
          cc.EaseCubicActionOut.create(
            cc.MoveTo.create(1.0, cc.p(Camera.center.x, Camera.center.y - Camera.c(60, this.button4).y))
          )
        )
      );

      this.decoration1.setLocalZOrder(cc.Game.layers.views);
      this.parameters.views.view2.setLocalZOrder(cc.Game.layers.views);

      this.run();
    }

    return this.parameters.views.view2;
  },
  createView3: function() {
    if(!this.parameters.views.view3) {
      this.parameters.views.view3 = new Background(this);
      this.parameters.views.view3.push = 0;
      this.parameters.views.view3.attr({
        x: Camera.width,
        y: 0,
        zIndex: cc.Game.layers.views
      });

      this.parameters.views.view3.button1 = new Button(resources.main.button1, this.parameters.views.view3, 1, 1, 1, 2, this.onBack.bind(this), 'back');
      this.parameters.views.view3.button2 = new Button(resources.main.button1, this.parameters.views.view3, 1, 1, 1, 2, this.onSettings.bind(this), 'settings');

      this.parameters.views.view3.button1.setOrientationConfig(new OrientationConfig({
        landscape: {
          x: Camera.s(20),
          y: Camera.s(6)
        }
      }));
      this.parameters.views.view3.button2.setOrientationConfig(new OrientationConfig({
        landscape: {
          x: -Camera.s(20),
          y: Camera.s(6)
        }
      }));

      var y;

      switch(Orientation.orientation) {
        case Orientation.types.portrait:
        y = Camera.s(0);
        break;
        case Orientation.types.landscape:
        y = Camera.s(6);
        break;
      }

      this.parameters.views.view3.button1.create().attr({x: Camera.center.x - this.parameters.views.view3.button1.getWidth() / 2 - Camera.c(3).x, y: Camera.c(cc.Game.ad.banner ? 20 : 10).y + y});
      this.parameters.views.view3.button2.create().attr({x: Camera.center.x + this.parameters.views.view3.button1.getWidth() / 2 + Camera.c(3).x, y: Camera.c(cc.Game.ad.banner ? 20 : 10).y + y});

      this.parameters.views.view3.button1.setAliasTexParameters();
      this.parameters.views.view3.button2.setAliasTexParameters();

      this.parameters.views.view3.text = new Text('description', this.parameters.views.view3);

      this.parameters.views.view3.text.setDimensions(cc.size(Camera.s(Camera.width * 0.8), 0));
      this.parameters.views.view3.text.setOrientationConfig(new OrientationConfig({
        portrait: {
          on: function() {
            this.setDimensions(cc.size(Camera.s(Camera.width * 0.8), 0));
          }.bind(this.parameters.views.view3.text)
        },
        landscape: {
          on: function() {
            this.setDimensions(cc.size(Camera.s(Camera.width * 0.8), 0));
          }.bind(this.parameters.views.view3.text)
        }
      }));

      this.parameters.views.view3.text.create().attr({
        x: Camera.center.x,
        y: Camera.center.y - Camera.c(5).y
      });
      this.parameters.views.view3.shadow = new BackgroundColor(this);
      this.parameters.views.view3.shadow.setLocalZOrder(cc.Game.layers.particles1 + 1);
      this.parameters.views.view3.shadow.setOpacity(0);
    }

    return this.parameters.views.view3;
  },
  createView4: function() {
    if(!this.parameters.views.view4) {
      this.parameters.views.view4 = new Background(this);
      this.parameters.views.view4.push = 0;
      this.parameters.views.view4.attr({
        x: Camera.width,
        y: 0,
        zIndex: cc.Game.layers.views
      });

      this.parameters.views.view4.button1 = new Button(resources.main.button1, this.parameters.views.view4, 1, 1, 1, 2, this.onPlaySingle.bind(this), 'single');
      this.parameters.views.view4.button2 = new Button(resources.main.button1, this.parameters.views.view4, 1, 1, 1, 2, this.onPlayOnline.bind(this), 'online');
      this.parameters.views.view4.button3 = new Button(resources.main.button1, this.parameters.views.view4, 1, 1, 1, 2, this.onBack.bind(this), 'back');

      this.parameters.views.view4.button1.setOrientationConfig(new OrientationConfig({
        landscape: {
          y: Camera.s(10)
        }
      }));
      this.parameters.views.view4.button2.setOrientationConfig(new OrientationConfig({
        landscape: {
          y: Camera.s(4)
        }
      }));
      this.parameters.views.view4.button3.setOrientationConfig(new OrientationConfig({
        landscape: {
          y: -Camera.s(3)
        }
      }));

      this.parameters.views.view4.button1.create().attr({x: Camera.center.x, y: Camera.center.y - Camera.c(0, this.parameters.views.view4.button1).y});
      this.parameters.views.view4.button2.create().attr({x: Camera.center.x, y: Camera.center.y - Camera.c(20, this.parameters.views.view4.button2).y});
      this.parameters.views.view4.button3.create().attr({x: Camera.center.x, y: Camera.center.y - Camera.c(40, this.parameters.views.view4.button3).y});

      this.parameters.views.view4.button1.setAliasTexParameters();
      this.parameters.views.view4.button2.setAliasTexParameters();
      this.parameters.views.view4.button3.setAliasTexParameters();
    }

    return this.parameters.views.view4;
  },
  createView5: function() {
    if(!this.parameters.views.view5) {
      this.parameters.views.view5 = new Background(this);
      this.parameters.views.view5.push = 0;
      this.parameters.views.view5.attr({
        x: Camera.width,
        y: 0,
        zIndex: cc.Game.layers.views
      });

      this.parameters.views.view5.button1 = new Button(resources.main.button1, this.parameters.views.view5, 1, 1, 1, 2, this.onLanguage.bind(this), 'language-' + Settings.Language.get().iso);
      this.parameters.views.view5.button2 = new Button(resources.main.button1, this.parameters.views.view5, 1, 1, 1, 2, this.onSound.bind(this), 'sound-' + (Music.enabled ? 'on' : 'off'));
      this.parameters.views.view5.button3 = new Button(resources.main.button1, this.parameters.views.view5, 1, 1, 1, 2, this.onVibrate.bind(this), 'vibrate-' + (Vibrator.enabled ? 'on' : 'off'));
      this.parameters.views.view5.button4 = new Button(resources.main.button1, this.parameters.views.view5, 1, 1, 1, 2, this.onBack.bind(this), 'back');

      this.parameters.views.view5.button1.setOrientationConfig(new OrientationConfig({
        landscape: {
          y: Camera.s(10)
        }
      }));
      this.parameters.views.view5.button2.setOrientationConfig(new OrientationConfig({
        landscape: {
          y: Camera.s(4)
        }
      }));
      this.parameters.views.view5.button3.setOrientationConfig(new OrientationConfig({
        landscape: {
          y: -Camera.s(2)
        }
      }));
      this.parameters.views.view5.button4.setOrientationConfig(new OrientationConfig({
        landscape: {
          y: -Camera.s(8)
        }
      }));

      this.parameters.views.view5.button1.create().attr({x: Camera.center.x, y: Camera.center.y - Camera.c(0, this.parameters.views.view5.button1).y});
      this.parameters.views.view5.button2.create().attr({x: Camera.center.x, y: Camera.center.y - Camera.c(20, this.parameters.views.view5.button2).y});
      this.parameters.views.view5.button3.create().attr({x: Camera.center.x, y: Camera.center.y - Camera.c(40, this.parameters.views.view5.button3).y});
      this.parameters.views.view5.button4.create().attr({x: Camera.center.x, y: Camera.center.y - Camera.c(60, this.parameters.views.view5.button4).y});

      this.parameters.views.view5.button1.setAliasTexParameters();
      this.parameters.views.view5.button2.setAliasTexParameters();
      this.parameters.views.view5.button3.setAliasTexParameters();
      this.parameters.views.view5.button4.setAliasTexParameters();
    }

    return this.parameters.views.view5;
  },
  createView6: function() {
    if(!this.parameters.views.view6) {
      this.parameters.views.view6 = new Background(this);
      this.parameters.views.view6.push = 0;
      this.parameters.views.view6.attr({
        x: Camera.width,
        y: 0,
        zIndex: cc.Game.layers.views
      });

      this.parameters.views.view6.button1 = new Button(resources.main.button1, this.parameters.views.view6, 1, 1, 1, 2, this.onPlayArcade.bind(this), 'mode-1');
      this.parameters.views.view6.button2 = new Button(resources.main.button1, this.parameters.views.view6, 1, 1, 1, 2, this.onPlaySurvival.bind(this), 'mode-2');
      this.parameters.views.view6.button3 = new Button(resources.main.button1, this.parameters.views.view6, 1, 1, 1, 2, this.onBack.bind(this), 'back');

      this.parameters.views.view6.button1.setOrientationConfig(new OrientationConfig({
        landscape: {
          y: Camera.s(10)
        }
      }));
      this.parameters.views.view6.button2.setOrientationConfig(new OrientationConfig({
        landscape: {
          y: Camera.s(4)
        }
      }));
      this.parameters.views.view6.button3.setOrientationConfig(new OrientationConfig({
        landscape: {
          y: -Camera.s(2)
        }
      }));

      this.parameters.views.view6.button1.create().attr({x: Camera.center.x, y: Camera.center.y - Camera.c(0, this.parameters.views.view4.button1).y});
      this.parameters.views.view6.button2.create().attr({x: Camera.center.x, y: Camera.center.y - Camera.c(20, this.parameters.views.view4.button2).y});
      this.parameters.views.view6.button3.create().attr({x: Camera.center.x, y: Camera.center.y - Camera.c(40, this.parameters.views.view4.button3).y});

      this.parameters.views.view6.button1.setAliasTexParameters();
      this.parameters.views.view6.button2.setAliasTexParameters();
      this.parameters.views.view6.button3.setAliasTexParameters();
    }

    return this.parameters.views.view6;
  },
  destroyViews: function() {
    if(this.parameters.views.view2) { this.createView2().destroy(Entity.destroy.complete); this.parameters.views.view2 = false; }
    if(this.parameters.views.view3) { this.createView3().destroy(Entity.destroy.complete); this.parameters.views.view3 = false; }
    if(this.parameters.views.view4) { this.createView4().destroy(Entity.destroy.complete); this.parameters.views.view4 = false; }
    if(this.parameters.views.view5) { this.createView5().destroy(Entity.destroy.complete); this.parameters.views.view5 = false; }
    if(this.parameters.views.view6) { this.createView6().destroy(Entity.destroy.complete); this.parameters.views.view6 = false; }
    this.parameters.views = {
      view1: false,
      view2: false,
      view3: false,
      view4: false,
      view5: false,
      view6: false,
      stack: {
        pushed: [],
        current: false
      }
    };
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
        this.parameters.state = cc.Game.states.animation;

        this.createView2(true);
        this.decoration1.create().attr({
          x: Camera.center.x,
          y: Camera.center.y * 1.6,
          zIndex: cc.Game.layers.top
        });
      }

      if(menu === false) {
        this.parameters.state = cc.Game.states.prepare;

        this.onPrepare(true);
      }
    } else {
      cc.Game.created = true;

      /**
       *
       * Setting properties.
       *
       */
      this.generator = new Generator(this);

      this.particles1 = new Manager(100, new Car.Particle1(), this, true, cc.Game.layers.particles1);
      this.particles2 = new Manager(100, new Car.Particle2(), this, true, cc.Game.layers.particles2);

      this.player = new Car(resources.frames.car1, this.generator.holders.cars);

      this.generator.create();
    }

    this.player.create().attr({
        x: -this.player.getWidth() / 2,
        y: Camera.center.y - Camera.c(10).y
    });
    this.player.setManagement(true);
    this.player.setLocalZOrder(cc.Game.layers.cars);
    this.player.runAction(
      cc.EaseSineOut.create(
        cc.MoveTo.create(1.0, cc.p(this.player.getWidth(), Camera.center.y - Camera.c(10).y))
      )
    );
  },

  /**
   *
   * 
   *
   */
  onKeyBack: function() {
    this.onBack();
  },
  onKeyEscape: function() {
    this.onBack();
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
    return;

    if(this.parameters.state === cc.Game.states.running) {
      this.player.onSwipeRight();
    }

    Sound.play(resources.sound.skid[0].random());

    Vibrator.vibrate(5);
  },
  onSwipeLeft: function() {
    return;

    if(this.parameters.state === cc.Game.states.running) {
      this.player.onSwipeLeft();
    }

    Sound.play(resources.sound.skid[0].random());

    Vibrator.vibrate(5);
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
     * Hide ads.
     *
     */
    Ad.Admob.hide(cc.Ad.Banner, {
      success: function() {
        cc.Game.ad.banner = false;
      }
    });

    this.destroyViews();

    this.text2.setText('tap-to-ready');
    this.text2.attr({
      x: Camera.center.x,
      y: Camera.center.y * 1.6,
      zIndex: cc.Game.layers.top
    });

    this.text2.onCreate = function() {
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
    this.decoration1.runAction(
      cc.Sequence.create(
        cc.EaseSineOut.create(
          cc.MoveTo.create(0.5, cc.p(Camera.center.x, Camera.height + Camera.c(20).y))
        ),
        cc.CallFunc.create(this.decoration1.destroy, this.decoration1),
        cc.CallFunc.create(this.text2.create, this.text2)
      )
    );

    Sound.play(resources.main.start);
  },
  onFinish: function() {
    Sound.play(resources.main.crash01);

    Game.speed = 0;

    this.text2.runAction(
      cc.Sequence.create(
        cc.DelayTime.create(1.0),
        cc.MoveTo.create(0.5, cc.p(Camera.center.x, Camera.height + this.text2.getHeightScaled())),
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
  },
  onRunning: function() {
    if(this.decoration1.getNumberOfRunningActions() > 0) {
      this.parameters.state = cc.Game.states.prepare;

      return false;
    };

    this.text2.stopAllActions();
    this.text2.setVisible(true);
    this.text2.setText('counter');
  },

  /**
   *
   * 
   *
   */
  onBack: function() {
    this.changeView();
  },
  onPlay: function() {
    this.changeView(this.createView2(), this.createView4());
  },
  onRate: function() {
    // TODO: Open rate window.
  },
  onMore: function() {
    this.changeView(this.createView2(), this.createView3());
  },
  onPlaySingle: function() {
    this.changeView(this.createView4(), this.createView6());
  },
  onPlayOnline: function() {
    Sound.play(resources.main.change);
  },
  onPlayArcade: function() {
    this.parameters.type = cc.Game.types.arcade;

    this.changeView(this.createView4());
    this.changeState(cc.Game.states.prepare);
  },
  onPlaySurvival: function() {
    this.parameters.type = cc.Game.types.survival;

    this.changeView(this.createView4());
    this.changeState(cc.Game.states.prepare);
  },
  onSettings: function() {
    this.changeView(this.createView3(), this.createView5());
  },
  onMenu: function() {
    this.changeView();
    this.restart(true);
  },
  onRestart: function() {
    this.changeView();
    this.restart(false);
  },
  onScores: function() {
    this.changeView();
    this.restart();
  },
  onSound: function() {
    if(Music.enabled || Sound.enabled) {
      Music.changeState(false);
      Sound.changeState(false);

      this.parameters.views.view5.button2.setText('sound-off');
    } else {
      Music.changeState(true);
      Sound.changeState(true);

      this.parameters.views.view5.button2.setText('sound-on');
    }
  },
  onVibrate: function() {
    this.parameters.views.view5.button3.setText('vibrate-' + (Vibrator.changeState() ? 'on' : 'off'));
  },
  onLanguage: function() {
    this.language = false;
    Language.next({
      start: function(callback, support) {
        this.language = support;

        callback();
      }.bind(this),
      finish: function() {
        this.parameters.views.view5.button1.setText('language-' + this.language.iso);
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

    this.text2.stopAllActions();
    this.text2.setScale(cc.director.getContentScaleFactor());
    this.text2.runAction(
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
    var stack = this.parameters.views.stack;

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

    if(view1) view1.runAction(
      cc.Sequence.create(
        cc.EaseElasticOut.create(
          cc.MoveTo.create(1.2, {x: Camera.width * (view1.push >= 1 ? -1 : 1), y: 0})
        ),
        cc.Hide.create()
      )
    );
    if(view2) view2.runAction(
      cc.Sequence.create(
        cc.Show.create(),
        cc.EaseElasticOut.create(
          cc.MoveTo.create(1.2, {x: 0, y: 0})
        )
      )
    );

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
    }
  },
  updatePrepare: function(time) {
  },
  updateRunning: function(time) {
    Game.speed += Camera.s(0.5 * time);

    this.text2.format([this.score]);
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
  finish: 4
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

cc.Game.loaded = false;
cc.Game.created = false;
cc.Game.onStart = function() {
  cc.Game.loaded = true;

  Finish = new cc.Finish;
};
