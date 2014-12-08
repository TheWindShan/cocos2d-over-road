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

View = Background.extend({

  /**
   *
   * 
   *
   */
  ctor: function(auto) {
    this._super();

    /**
     *
     * Setting properties.
     *
     */
    this.push = 0;
    this.attr({
      x: Camera.width,
      y: 0,

      zIndex: cc.Game.layers.views
    });

    /**
     *
     * Memory management.
     *
     */
    this.retain();

    /**
     *
     * Add to the screen if autorected.
     *
     */
    if(auto) {
      Game.addChild(this);
    }
  },

  /**
   *
   * 
   *
   */
  open: function() {
    Game.addChild(this);
  },
  close: function() {
    this.removeFromParent();
  },

  /**
   *
   * 
   *
   */
  show: function() {

    /**
     *
     * Reset all views.
     *
     */
    View2.push = 1;
    //View3.push = 0;
    View4.push = 0;
    View5.push = 0;
    View6.push = 0;
    View7.push = 0;

    /**
     *
     * Show current.
     *
     */
    Game.addChild(this);
    this.attr({
      x: 0,
      y: 0
    });
  }
});
