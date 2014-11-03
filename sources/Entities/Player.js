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

Player = Car.extend({

  /**
   *
   * 
   *
   */
  ctor: function(parent, type) {
    this._super(resources.frames.car01, parent);

    /**
     *
     * Setting properties.
     *
     */
    this.type = type || Data.get(false, properties.cars.current);

    /**
     *
     *
     *
     */
    this.changeType(this.type);
  },

  /**
   *
   * 
   *
   */
  onCreate: function() {
    this._super();

    this.setManagement(true);
    this.setLocalZOrder(cc.Game.layers.cars);
  },
  onDestroy: function() {
    this._super();
  },

  /**
   *
   * 
   *
   */
  changeType: function(type) {
    if(this.type === type) return false;

    /**
     *
     *
     *
     */
    this.type = type;

    // TODO: Call action events.
    switch(Player.textures[this.type]) {
      case Player.types.simple:
      break;
      case Player.types.army:
      break;
      case Player.types.police:
      break;
    }

    this.changeTexture(Player.textures[this.type]);

    /**
     *
     *
     *
     */
    return this.type;
  },

  /**
   *
   * 
   *
   */
  nextType: function() {
    return this.changeType(this.type >= (Player.textures.length - 1) ? 0 : this.type + 1);
  },
  previousType: function() {
    return this.changeType(this.type <= 0 ? (Player.textures.length - 1) : this.type - 1);
  },

  /**
   *
   * 
   *
   */
  update: function(time) {
    this._super(time);
  }
});

Player.types = {
  simple: resources.frames.car01,
  army: resources.frames.car02,
  police: resources.frames.car03
};
Player.textures = [
  Player.types.simple,
  Player.types.army,
  Player.types.police
];
