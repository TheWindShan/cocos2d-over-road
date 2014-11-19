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

cc.View3 = View.extend({

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
    View3 = this;

    /**
     *
     * Create elements.
     *
     */
    this.scroll = new ScrollView(cc.size(Camera.width, Camera.height / 1.5), this);

    this.button1 = new Button(resources.main.button1, this, 1, 1, 1, 2, Game.onBack.bind(Game), 'back');
    this.button2 = new Button(resources.main.button1, this, 1, 1, 1, 2, Game.onSettings.bind(Game), 'settings');

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

    var y;

    switch(Orientation.orientation) {
      case Orientation.types.portrait:
      y = Camera.s(0);
      break;
      case Orientation.types.landscape:
      y = Camera.s(6);
      break;
    }

    this.button1.create().attr({x: Camera.center.x - this.button1.getWidth() / 2 - Camera.c(3).x, y: Camera.c(cc.Game.ad.banner ? 20 : 10).y + y});
    this.button2.create().attr({x: Camera.center.x + this.button1.getWidth() / 2 + Camera.c(3).x, y: Camera.c(cc.Game.ad.banner ? 20 : 10).y + y});

    this.button1.setAliasTexParameters();
    this.button2.setAliasTexParameters();

    this.scroll.create().attr({
      y: Camera.center.y - Camera.height / 2.5
    });

    this.text = new Text('description', this.scroll);

    this.text.setOrientationConfig(new OrientationConfig({
      portrait: {
        on: function() {
          this.setDimensions(cc.size(Camera.s(Camera.width * 0.8), 0));
        }.bind(this.text)
      },
      landscape: {
        on: function() {
          this.setDimensions(cc.size(Camera.s(Camera.width * 0.8), 0));
        }.bind(this.text)
      }
    }));

    this.text.create().attr({
      x: this.scroll.width / 2,
      y: -this.scroll.height / 2
    });

    this.shadow = new BackgroundColor(Game);
    this.shadow.setLocalZOrder(cc.Game.layers.particles1 + 1);
    this.shadow.setOpacity(0);
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
    Game.changeState(cc.Game.states.animation);
  },
  onHide: function() {
    this._super();
  }
});
