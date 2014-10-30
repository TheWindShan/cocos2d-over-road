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

cc.Finish = Popup.extend({

  /**
   *
   * 
   *
   */
  ctor: function() {
    this._super(resources.main.popup1);

    /**
     *
     * 
     *
     */
    this.button1 = new Button(resources.main.button1, this, 1, 1, 1, 2, false, 'play');
    this.button2 = new Button(resources.main.button1, this, 1, 1, 1, 2, false, 'scores');
    this.button3 = new Button(resources.main.button1, this, 1, 1, 1, 2, false, 'menu');

    this.button1.create().attr({x: this.size.center.x, y: this.size.center.y});
    this.button2.create().attr({x: this.size.center.x, y: this.size.center.y - Camera.coord(15)});
    this.button3.create().attr({x: this.size.center.x, y: this.size.center.y - Camera.coord(30)});

    this.button1.setAliasTexParameters();
    this.button2.setAliasTexParameters();
    this.button3.setAliasTexParameters();

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
  onShowStart: function() {
    this._super();

    this.button1.action = Game.onRestart.bind(Game);
    this.button2.action = Game.onScores.bind(Game);
    this.button3.action = Game.onMenu.bind(Game);

    this.attr({
      x: Camera.center.x + Camera.coord(10),
      y: Camera.center.y,
      opacity: 0
    });
    this.runAction(
      cc.FadeIn.create(this.parameters.background.fade.show)
    );
    this.runAction(
      cc.MoveTo.create(this.parameters.background.fade.show, {
        x: Camera.center.x,
        y: Camera.center.y,
      })
    );
  },
  onHideStart: function() {
    this._super();
  },
  onShowFinish: function() {
    this._super();
  },
  onHideFinish: function() {
    this._super();
  },

  /**
   *
   * 
   *
   */
  onEnter: function() {
    this._super();
  },
  onExit: function() {
    this._super();
  }
});
