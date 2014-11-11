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

cc.View6 = View.extend({

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
    View6 = this;

    /**
     *
     * Create elements.
     *
     */
    this.button1 = new Button(resources.main.button1, this, 1, 1, 1, 2, Game.onPlaySurvival.bind(Game), 'mode-2');
    this.button2 = new Button(resources.main.button1, this, 1, 1, 1, 2, Game.onPlayArcade.bind(Game), 'mode-1');
    this.button3 = new Button(resources.main.button1, this, 1, 1, 1, 2, Game.onBack.bind(Game), 'back');

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

    this.button1.create().attr({x: Camera.center.x, y: Camera.center.y - Camera.c(0, this.button1).y});
    this.button2.create().attr({x: Camera.center.x, y: Camera.center.y - Camera.c(20, this.button2).y});
    this.button3.create().attr({x: Camera.center.x, y: Camera.center.y - Camera.c(40, this.button3).y});

    this.button1.setAliasTexParameters();
    this.button2.setAliasTexParameters();
    this.button3.setAliasTexParameters();
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
