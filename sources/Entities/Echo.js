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

Echo = Background.extend({

  /**
   *
   * 
   *
   */
  ctor: function(data) {
    this._super(Game);

    /**
     *
     *
     *
     */
    this.parameters = {
      animation: {
        fade: {
          show: 0.5,
          hide: 0.5
        },
        show: 5.0
      }
    };

    /**
     *
     *
     *
     */
    this.holder = new Entity(resources.main.holder1, this, true);

    /**
     *
     *
     *
     */
    this.photo = new Entity(data.info.personal.photo, this.holder, true);

    /**
     *
     *
     *
     */
    this.text1 = new Text('echo-1', this.holder, {x: cc.TEXT_ALIGNMENT_LEFT, y: cc.VERTICAL_TEXT_ALIGNMENT_CENTER});
    this.text2 = new Text('echo-2', this.holder, {x: cc.TEXT_ALIGNMENT_LEFT, y: cc.VERTICAL_TEXT_ALIGNMENT_CENTER});

    /**
     *
     *
     *
     */
    this.create();
    this.setCascadeOpacityEnabled(true);
    this.setLocalZOrder(cc.Game.layers.top);
    this.setOpacity(0);
    this.runAction(
      cc.Sequence.create(
        cc.MoveTo.create(this.parameters.animation.fade.show, {x: this.x, y: this.y - Camera.c(5).y}),
        cc.DelayTime.create(this.parameters.animation.show),
        cc.MoveTo.create(this.parameters.animation.fade.hide, {x: this.x, y: this.y + Camera.c(5).y})
      )
    );
    this.runAction(
      cc.Sequence.create(
        cc.FadeIn.create(this.parameters.animation.fade.show),
        cc.DelayTime.create(this.parameters.animation.show),
        cc.FadeOut.create(this.parameters.animation.fade.hide),
        cc.CallFunc.create(function() {
        this.destroy(Entity.destroy.complete);
        }.bind(this))
      )
    );

    /**
     *
     *
     *
     */
    this.holder.setPosition(Camera.center.x, Camera.height - Camera.c(25).y);
    this.holder.setCascadeOpacityEnabled(true);
    this.holder.setAliasTexParameters();

    /**
     *
     *
     *
     */
    this.photo.setScale(cc.director.getContentScaleFactor() / 1.5);
    this.photo.setPosition(Camera.s(8.5), Camera.s(8.5));

    /**
     *
     *
     *
     */
    this.text1.create().setPosition(Camera.s(20), this.holder.getHeight() / 2 + Camera.s(3));
    this.text2.create().setPosition(Camera.s(20), this.holder.getHeight() / 2 - Camera.s(3));

    this.text1.format([data.info.personal.name, data.info.personal.surname]);
    this.text2.format([data.data.score]);
  }
});
