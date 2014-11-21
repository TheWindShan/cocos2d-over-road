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

CustomEntry = Entry.extend({

  /**
   *
   *
   *
   */
  ctor: function(information) {
    this._super(false, {
      width: 0,
      height: Camera.s(20)
    });

    /**
     *
     *
     *
     */
    this.photo = new Entity(information.photo, this);
    this.text1 = new Text('view-1', this, {x: cc.TEXT_ALIGNMENT_LEFT, y: cc.VERTICAL_TEXT_ALIGNMENT_CENTER});
    this.text2 = new Text(information.online ? 'view-2' : 'view-3', this, {x: cc.TEXT_ALIGNMENT_LEFT, y: cc.VERTICAL_TEXT_ALIGNMENT_CENTER});

    /**
     *
     * Work with photo.
     *
     */
    this.photo.create();
    this.photo.setScale(cc.director.getContentScaleFactor() / 1.5);
    this.photo.setPosition(Camera.s(10), this.height / 2);
    this.photo.setLocalZOrder(-1);

    /**
     *
     * Work with textes.
     *
     */
    this.text1.create().setPosition(Camera.s(20), this.height / 2 + Camera.s(3));
    this.text2.create().setPosition(Camera.s(20), this.height / 2 - Camera.s(3));

    this.text1.format([information.name, information.surname]);
    this.text2.format([0]);
  }
});
