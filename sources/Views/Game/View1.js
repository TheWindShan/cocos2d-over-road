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

cc.View1 = View.extend({

  /**
   *
   * 
   *
   */
  ctor: function() {
    this._super(true);

    /**
     *
     * Setting global pointer.
     *
     */
    View1 = this;

    /**
     *
     * Setting properties.
     *
     */
    this.attr({
      x: 0,
      y: 0
    });
    Game.addChild(new cc.LayerGradient(cc.color(3, 133, 193), cc.color(9, 172, 247), cc.p(0.5, 0.5)));

    /**
     *
     * Create elements.
     *
     */
    this.background = new Entity(resources.loading.background, this, true);

    this.text1 = new Text('loading-1', this);
    this.text1.create().attr({
      x: Camera.center.x,
      y: Camera.center.y * 0.4 - Camera.c(5).y
    });

    this.decoration1 = new AnimatedEntity(resources.loading.decoration2, 1, 2, this);
    this.decoration2 = new NineEntity(resources.loading.decoration3, this, 1, 1, 1, 1);

    this.decoration1.animate(0.2);

    this.background.setAliasTexParameters();
    this.decoration1.setAliasTexParameters();
    this.decoration2.setAliasTexParameters();

    this.decoration1.create().attr({
      x: -this.decoration2.getWidth() / 2,
      y: Camera.center.y
    });
    this.decoration1.runAction(
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
          cc.CallFunc.create(Game.completed, Game)
        )
      )
    );

    this.decoration2.create().attr({
      x: Camera.center.x - this.decoration2.getContentSize().width / 2,
      y: Camera.center.y * 0.5
    });
    this.decoration2.setAnchorPoint(cc.p(0.0, 0.5));

    /**
     *
     * Create game elements.
     *
     */
    Game.counter = new Text('tap-to-ready', Game);

    Game.name = new Entity(resources.loading.decoration1, Game);
    Game.name.create().attr({
      x: Camera.center.x,
      y: Camera.center.y * 1.4,

      zIndex: cc.Game.layers.top
    });
    Game.name.setAliasTexParameters();
  },

  /**
   *
   *
   *
   */
  remove: function() {
    cc.Game.onStart();

    this.decoration1.stopAllActions();
    this.decoration2.runAction(
      cc.EaseCubicActionOut.create(
        cc.MoveTo.create(1.0, cc.p(-this.decoration2.getWidth(), this.decoration2.getPosition().y))
      )
    );
    this.text1.runAction(
      cc.Sequence.create(
        cc.EaseCubicActionOut.create(
          cc.MoveTo.create(1.0, cc.p(Camera.width + this.text1.getWidth(), this.text1.getPosition().y))
        ),
        cc.CallFunc.create(function() {

          /**
           *
           * Destroy view complete.
           *
           */
          this.destroy(Entity.destroy.complete);

          /**
           *
           * Create next view.
           *
           */
          new cc.View2;
        }.bind(this))
      )
    );
  }
});
