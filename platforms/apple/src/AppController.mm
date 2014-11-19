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

#import <UIKit/UIKit.h>
#import <AudioToolbox/AudioToolbox.h> 
#import "cocos2d.h"

#import "AppController.h"
#import "AppDelegate.h"
#import "RootViewController.h"
#import "platform/ios/CCEAGLView-ios.h"
#import "FacebookSDK/FacebookSDK.h"

@implementation AppController

#pragma mark -
#pragma mark Application lifecycle

static AppDelegate s_sharedApplication;

- (BOOL)application: (UIApplication *) application didFinishLaunchingWithOptions: (NSDictionary *) launchOptions {
  window = [[UIWindow alloc] initWithFrame: [[UIScreen mainScreen] bounds]];
  CCEAGLView *eaglView = [CCEAGLView viewWithFrame: [window bounds]
    pixelFormat: kEAGLColorFormatRGBA8
    depthFormat: GL_DEPTH24_STENCIL8_OES
    preserveBackbuffer: NO
    sharegroup: nil
    multiSampling: NO
    numberOfSamples: 0
  ];

  [eaglView setMultipleTouchEnabled: FALSE];

  viewController = [[RootViewController alloc] initWithNibName: nil bundle: nil];
  viewController.wantsFullScreenLayout = YES;
  viewController.view = eaglView;

  if([[UIDevice currentDevice].systemVersion floatValue] < 6.0) {
    [window addSubview: viewController.view];
  } else {
    [window setRootViewController:viewController];
  }

  [window makeKeyAndVisible];

  [[UIApplication sharedApplication] setStatusBarHidden: YES];

  cocos2d::GLView *glview = cocos2d::GLViewImpl::createWithEAGLView(eaglView);
  cocos2d::Director::getInstance()->setOpenGLView(glview);

  cocos2d::Application::getInstance()->run();

  return YES;
}

- (void) applicationWillResignActive: (UIApplication *) application {
  cocos2d::Director::getInstance()->pause();
}

- (void) applicationDidBecomeActive: (UIApplication *) application {
  [FBAppCall handleDidBecomeActive];

  cocos2d::Director::getInstance()->resume();
}

- (void) applicationDidEnterBackground: (UIApplication *) application {
  cocos2d::Application::getInstance()->applicationDidEnterBackground();
}

- (void) applicationWillEnterForeground: (UIApplication *) application {
  cocos2d::Application::getInstance()->applicationWillEnterForeground();
}

- (void) applicationWillTerminate: (UIApplication *) application {
}

- (BOOL) application: (UIApplication *) application openURL: (NSURL *) url sourceApplication: (NSString *) sourceApplication annotation: (id) annotation {
  return [FBSession.activeSession handleOpenURL: url];
}

#pragma mark -
#pragma mark Memory management

- (void) applicationDidReceiveMemoryWarning: (UIApplication *) application {
  cocos2d::Director::getInstance()->purgeCachedData();
}

- (void) dealloc {
  [super dealloc];
}

#pragma mark -
#pragma mark Javascript management

+ (void) vibrate: (NSNumber *) time {
   if([[UIDevice currentDevice].model isEqualToString:@"iPhone"]) {
    AudioServicesPlaySystemSound(kSystemSoundID_Vibrate);
   } else {
    AudioServicesPlayAlertSound(1105);
   }
}

- (void) orientationChanged: (NSNotification *) notification {
   [self adjustViewsForOrientation: [[UIApplication sharedApplication] statusBarOrientation]];
}

@end
