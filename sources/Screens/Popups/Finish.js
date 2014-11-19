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
    this.decoration1 = new Entity(resources.main.backgroundDecoration2, this);

    this.button1 = new Button(resources.main.button1, this, 1, 1, 1, 2, this.onRestart.bind(this), 'retry');
    this.button2 = new Button(resources.main.button1, this, 1, 1, 1, 2, this.onScores.bind(this), 'scores');

    this.text1 = new Text('best-score-title', this, {
      x: cc.TEXT_ALIGNMENT_RIGHT,
      y: cc.VERTICAL_TEXT_ALIGNMENT_CENTER
    });
    this.text10 = new Text('best-score', this, {
      x: cc.TEXT_ALIGNMENT_RIGHT,
      y: cc.VERTICAL_TEXT_ALIGNMENT_CENTER
    });

    this.text2 = new Text('current-score-title', this, {
      x: cc.TEXT_ALIGNMENT_RIGHT,
      y: cc.VERTICAL_TEXT_ALIGNMENT_CENTER
    });
    this.text20 = new Text('current-score', this, {
      x: cc.TEXT_ALIGNMENT_RIGHT,
      y: cc.VERTICAL_TEXT_ALIGNMENT_CENTER
    });

    this.decoration1.create().attr({x: this.size.center.x, y: Camera.c(50).y});

    this.button1.create().attr({x: this.size.center.x, y: this.size.center.y});
    this.button2.create().attr({x: this.size.center.x, y: this.size.center.y});

    this.decoration1.setAliasTexParameters();
    this.button1.setAliasTexParameters();
    this.button2.setAliasTexParameters();

    this.text1.create().attr({x: this.size.width - Camera.c(10).x, y: this.size.center.y + Camera.c(20).y});
    this.text2.create().attr({x: this.size.width - Camera.c(10).x, y: this.size.center.y - Camera.c(5).y});

    this.text10.create().attr({x: this.size.width - Camera.c(10).x, y: this.size.center.y + Camera.c(10).y});
    this.text20.create().attr({x: this.size.width - Camera.c(10).x, y: this.size.center.y - Camera.c(15).y});

    /**
     *
     * 
     *
     */
    this.setAliasTexParameters();

    /**
     *
     * Need to disable manual set of orientation changes for children
     * because all children is positions by background of popup.
     *
     */
    this.disableOrientationsChangesForChildren();
  },

  /**
   *
   * 
   *
   */
  onShowStart: function() {
    this._super();

    this.text10.format([Data.get(false, properties.best)]);
    this.text20.format([0]);

    this.animation = {
      counting: false,
      counter: 0,
      time: {
        current: 0.05,
        elapsed: 0
      }
    };

    this.decoration1.attr({
      y: Camera.c(200).y,
      opacity: 0
    });

    this.button1.attr({
      x: this.size.center.x + Camera.c(30).x,
      y: -Camera.center.y,
      opacity: 0
    });
    this.button2.attr({
      x: this.size.center.x - Camera.c(30).x,
      y: -Camera.center.y,
      opacity: 0
    });

    this.attr({
      x: Camera.center.x + Camera.c(10).x,
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

    this.runAction(
      cc.FadeOut.create(this.parameters.background.fade.hide)
    );
    this.runAction(
      cc.MoveTo.create(this.parameters.background.fade.hide, {
        x: Camera.center.x + Camera.c(10).x,
        y: Camera.center.y,
      })
    );
  },
  onShowFinish: function() {
    this._super();

    this.decoration1.runAction(cc.FadeIn.create(0.5));
    this.decoration1.runAction(
      cc.EaseSineOut.create(
        cc.MoveTo.create(0.5, {
          x: this.size.center.x,
          y: Camera.c(90).y
        })
      )
    );

    this.animation.counting = true;
  },
  onHideFinish: function() {
    this._super();

    this.decorationMedal.destroy();
  },

  /**
   *
   * 
   *
   */
  onCounting: function() {
    this.text20.format([++this.animation.counter]);

    // TODO: Add Sound.
  },
  onCountingFinish: function() {
    this.animation.counting = false;

    if(this.animation.counter >= Data.get(false, properties.best)) {
      Data.set(true, properties.best, this.animation.counter);
      // TODO: Add best label.
      // TODO: Add Sound.

      this.text10.format([this.animation.counter]);
    }

    this.button1.runAction(cc.FadeIn.create(0.5));
    this.button2.runAction(cc.FadeIn.create(0.5));
    this.button1.runAction(
      cc.EaseSineOut.create(
        cc.MoveTo.create(0.5, {
          x: this.button1.x,
          y: this.size.center.y - Camera.c(40).y
        })
      )
    );
    this.button2.runAction(
      cc.EaseSineOut.create(
        cc.MoveTo.create(0.5, {
          x: this.button2.x,
          y: this.size.center.y - Camera.c(40).y
        })
      )
    );
  },

  /**
   *
   * 
   *
   */
  onRestart: function() {
    this.hide(Game.onRestart.bind(Game));
  },
  onScores: function() {
    this.hide(Game.onScores.bind(Game));
  },
  onMenu: function() {
    this.hide(Game.onMenu.bind(Game));
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
  },

  /**
   *
   * 
   *
   */
  update: function(time) {
    this._super(time);

    if(this.animation.counting) {
      this.animation.time.elapsed += time;

      if(this.animation.time.elapsed >= this.animation.time.current) {
        this.animation.time.elapsed = 0;

        this.onCounting();

        if(this.animation.counter >= Game.score) {
          this.onCountingFinish();
        }
      }
    }
  }
});
