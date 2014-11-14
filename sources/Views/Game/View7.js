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

cc.View7 = View.extend({

  /**
   *
   * 
   *
   */
  ctor: function() {
    this._super();

    /**
     *
     * Setting global pointer.
     *
     */
    View7 = this;

    /**
     *
     * Create elements.
     *
     */
    this.backgrounds = {
      control: new Background(this)
    };

    this.button1 = new Button(resources.main.button1, this, 1, 1, 1, 2, this.onPrev.bind(this), 'previous');
    this.button2 = new Button(resources.main.button1, this, 1, 1, 1, 2, this.onNext.bind(this), 'next');
    this.button3 = new Button(resources.main.button1, this, 1, 1, 1, 2, this.onMenu.bind(this), 'menu');
    this.button4 = new Button(resources.main.button2, this, 1, 1, 1, 2, this.onCheck.bind(this), 'choose');
    this.panel = new Entity(resources.frames.textpanel, this);

    this.description = new Text('car-0', this.panel);

    this.button1.setOrientationConfig(new OrientationConfig({
      landscape: {
        x: Camera.s(20),
        y: Camera.s(6)
      }
    }));
    this.button2.setOrientationConfig(new OrientationConfig({
      landscape: {
        x: -Camera.s(20),
        y: Camera.s(6)
      }
    }));
    this.button3.setOrientationConfig(new OrientationConfig({
      landscape: {
        y: -Camera.s(2)
      }
    }));
    this.button4.setOrientationConfig(new OrientationConfig({
      landscape: {
        y: -Camera.s(2)
      }
    }));
    this.panel.setOrientationConfig(new OrientationConfig({
      landscape: {
        y: -Camera.s(2)
      }
    }));

    this.button1.create().attr({x: Camera.center.x - this.button1.getWidth() / 2 - Camera.c(7).x, y: Camera.center.y - Camera.c(70, this.button1).y});
    this.button2.create().attr({x: Camera.center.x + this.button1.getWidth() / 2 + Camera.c(7).x, y: Camera.center.y - Camera.c(70, this.button2).y});
    this.button3.create().attr({x: Camera.center.x, y: Camera.center.y - Camera.c(100, this.button3).y});
    this.button4.create().attr({x: Camera.center.x, y: Camera.center.y + Camera.c(50, this.button4).y, opacity: 0});
    this.panel.create().attr({x: Camera.center.x, y: Camera.center.y - Camera.c(40, this.button1).y});
    this.description.create().attr({x: this.panel.getWidth() / 2, y: this.panel.getHeight() / 2});

    this.button1.setAliasTexParameters();
    this.button2.setAliasTexParameters();
    this.button3.setAliasTexParameters();
    this.button4.setAliasTexParameters();
    this.panel.setAliasTexParameters();

    this.panel.disableOrientationsChangesForChildren();

    this.button4.setCascadeOpacityEnabled(true);
  },

  /**
   *
   * 
   *
   */
  onShow: function() {
    this._super();

    /**
     *
     * change state.
     *
     */
    Game.changeState(cc.Game.states.store);

    /**
     *
     *
     *
     */
    this.choose = Game.player.type;
    this.description.setText('car-' + this.choose);
  },
  onHide: function() {
    this._super();
  },

  /**
   *
   * 
   *
   */
  onBuy: function(type) {
    //
  },
  onSelect: function(type) {
    Data.get(true, [properties.cars.current, properties.cars.current + type], [type, 1], {
      success: function() {
        this.button4.runAction(
          cc.MoveTo.create(0.2, {
            x: Camera.center.x,
            y: this.button4.y + Camera.c(20).y
          })
        );
        this.button4.runAction(
          cc.FadeTo.create(0.2, 0)
        );
      }.bind(this)
    });
  },
  onCheck: function() {
    var type = Game.player.type;

    if(Data.get(false, properties.cars.current + type)) {
      if(Data.get(false, properties.cars.current) !== type) {
        this.onSelect(type);
      }
    } else {
      this.onBuy(type);
    }
  },

  /**
   *
   * 
   *
   */
  onNext: function() {
    var player = Game.player;

    if(player.getNumberOfRunningActions() < 2) {
      if(this.button4.getOpacity() > 0) {
        this.button4.runAction(
          cc.MoveTo.create(0.2, {
            x: Camera.center.x,
            y: this.button4.y + Camera.c(20).y
          })
        );
        this.button4.runAction(
          cc.FadeTo.create(0.2, 0)
        );
      }

      player.setRotation(0);

      player.runAction(
        cc.Sequence.create(
          cc.EaseCubicActionOut.create(
            cc.MoveTo.create(1.0, {
              x: Camera.width + player.getHeight(),
              y: Camera.center.y
            })
          ),
          cc.CallFunc.create(function() {
            player.x = -player.getWidth();

            player.runAction(
              cc.Sequence.create(
                cc.DelayTime.create(1.0),
                cc.EaseCubicActionOut.create(
                  cc.MoveTo.create(1.0, {
                    x: Camera.center.x,
                    y: Camera.center.y - Camera.c(10).y
                  })
                )
              )
            );

            this.description.setText('car-' + player.nextType());

            this.check();
          }.bind(this))
        )
      );
    }
  },
  onPrev: function() {
    var player = Game.player;

    if(player.getNumberOfRunningActions() < 2) {
      if(this.button4.getOpacity() > 0) {
        this.button4.runAction(
          cc.MoveTo.create(0.2, {
            x: Camera.center.x,
            y: this.button4.y + Camera.c(20).y
          })
        );
        this.button4.runAction(
          cc.FadeTo.create(0.2, 0)
        );
      }

      player.setRotation(0);

      player.runAction(
        cc.Sequence.create(
          cc.EaseCubicActionOut.create(
            cc.MoveTo.create(1.0, {
              x: Camera.width + player.getHeight(),
              y: Camera.center.y
            })
          ),
          cc.CallFunc.create(function() {
            player.x = -player.getWidth();

            player.runAction(
              cc.Sequence.create(
                cc.DelayTime.create(1.0),
                cc.EaseCubicActionOut.create(
                  cc.MoveTo.create(1.0, {
                    x: Camera.center.x,
                    y: Camera.center.y - Camera.c(10).y
                  })
                )
              )
            );

            this.description.setText('car-' + player.previousType());

            this.check();
          }.bind(this))
        )
      );
    }
  },
  onMenu: function() {
    if(Game.player.type != this.choose) {
      var player = Game.player;

      if(player.getNumberOfRunningActions() < 2) {
        if(this.button4.getOpacity() > 0) {
          this.button4.runAction(
            cc.MoveTo.create(0.2, {
              x: Camera.center.x,
              y: this.button4.y + Camera.c(20).y
            })
          );
          this.button4.runAction(
            cc.FadeTo.create(0.2, 0)
          );
        }

        player.setRotation(0);

        player.runAction(
          cc.Sequence.create(
            cc.EaseCubicActionOut.create(
              cc.MoveTo.create(1.0, {
                x: Camera.width + player.getHeight(),
                y: Camera.center.y
              })
            ),
            cc.CallFunc.create(function() {
              player.x = -player.getWidth();

              player.runAction(
                cc.Sequence.create(
                  cc.DelayTime.create(1.0),
                  cc.EaseCubicActionOut.create(
                    cc.MoveTo.create(1.0, {
                      x: Camera.center.x,
                      y: Camera.center.y - Camera.c(10).y
                    })
                  ),
                  cc.CallFunc.create(Game.onBack, Game)
                )
              );

              this.description.setText('car-' + player.changeType(this.choose));
            }.bind(this))
          )
        );
      }
    } else {
      Game.onBack(true);
    }
  },
  onBack: function() {
    return this.onMenu();
  },

  /**
   *
   * 
   *
   */
  check: function() {
    var type = Game.player.type;

    if(Data.get(false, properties.cars.current + type) || !type) {
      if(Data.get(false, properties.cars.current) !== type) {
        this.button4.setText('choose');
      } else {
        return false;
      }
    } else {
      this.button4.setText('buy-car-' + type);
    }

    this.button4.runAction(
      cc.MoveTo.create(0.2, {
        x: Camera.center.x,
        y: this.button4.y - Camera.c(20).y
      })
    );
    this.button4.runAction(
      cc.FadeTo.create(0.2, 255)
    );

    Api.call('payments.visit');
  }
});
