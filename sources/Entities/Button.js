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

Button.prototype.export = function() {
  this.onHover = function() {
    this.setCurrentFrameIndex(1);
  };
  this.onUnHover = function() {
    this.setCurrentFrameIndex(0);
  };

  this.onTouchStart = function() {
    this.stopAllActions();
    this.runAction(cc.ScaleTo.create(0.1, 0.95));

    Sound.play(resources.main.button);
  };
  this.onTouchFinish = function(touch, e) {
    this.stopAllActions();
    this.runAction(
      cc.Sequence.create(
        cc.ScaleTo.create(0.1, 1.0),
        // TODO: Is DelayTime is need here? Fix some bug with onTouchFinish
        touch ? cc.CallFunc.create(this.onTouch, this) : cc.DelayTime.create(0.5)
      )
    );
  };

  this.onTouch = function() {
    if(this.action) {
      this.action();
    }
  };
};

// TODO: Add notifier.
