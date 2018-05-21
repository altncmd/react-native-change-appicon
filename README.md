react-native-change-appicon
======
Change app icon for iOS

Installation
------
yarn add react-native-change-appicon<br>
react-native link react-native-change-appicon

Documentation
------
1.Add a `ViewController` to your project as a rootViewController which inherited from `UIViewController` and write the following code in `ViewController.m` file:<br>

```Objective-C
#import "ViewController.h"
#import <objc/runtime.h>

@interface ViewController ()

@end

@implementation ViewController

- (instancetype)init
{
  self = [super init];
  if (self) {
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
      Method presentM = class_getInstanceMethod(self.class, @selector(presentViewController:animated:completion:));
      Method presentSwizzlingM = class_getInstanceMethod(self.class, @selector(ox_presentViewController:animated:completion:));
      method_exchangeImplementations(presentM, presentSwizzlingM);
    });
  }
  return self;
}

- (void)viewDidLoad {
    [super viewDidLoad];
    // Do any additional setup after loading the view.
}

- (void)ox_presentViewController:(UIViewController *)viewControllerToPresent animated:(BOOL)flag completion:(void (^)(void))completion {
  if ([viewControllerToPresent isKindOfClass:[UIAlertController class]]) {
    UIAlertController *alertController = (UIAlertController *)viewControllerToPresent;
    if (alertController.title == nil && alertController.message == nil) {
      return;
    } else {
      [self ox_presentViewController:viewControllerToPresent animated:flag completion:completion];
      return;
    }
  }
  [self ox_presentViewController:viewControllerToPresent animated:flag completion:completion];
}

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

@end
```


2.Change the rootViewController at `AppDelegate.m` of your project:
```Objective-C
#import "ViewController.h"

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  ...
  UIViewController *rootViewController = [[ViewController alloc] init];
  rootViewController.view = rootView;
  self.window.rootViewController = rootViewController;
  [self.window makeKeyAndVisible];
  return YES;
}

@end
```

3.Add icons to your project which you want to change to.<br>
(Icons are all in the 'icons' directory in the Example project)

4.Add key-values in the `Info.plist` file like this:<br>
(you should change the icon names `'icon0*.png'` to your own icon names and one-to-one correspondence with pictures from icons directory)<br>

`CFBundlePrimaryIcon`：APP default icon<br>
`CFBundleAlternateIcons`：Alternate icons(All your alternate icons should write here)<br>
`UINewsstandIcon`: news stand icon<br>



your project -> Info.plist -> right click -> Open As -> Source Code:
```Objective-C
  <key>CFBundleIcons</key>
  <dict>
    <key>CFBundleAlternateIcons</key>
    <dict>
      <key>icon01.png</key>
      <dict>
        <key>CFBundleIconFiles</key>
        <array>
          <string>icon01.png</string>
        </array>
        <key>UIPrerenderedIcon</key>
        <false/>
      </dict>
      <key>icon02.png</key>
      <dict>
        <key>CFBundleIconFiles</key>
        <array>
          <string>icon02.png</string>
        </array>
        <key>UIPrerenderedIcon</key>
        <false/>
      </dict>
    </dict>
    <key>CFBundlePrimaryIcon</key>
    <dict>
      <key>CFBundleIconFiles</key>
      <array>
        <string>icon01.png</string>
      </array>
      <key>UIPrerenderedIcon</key>
      <false/>
    </dict>
    <key>UINewsstandIcon</key>
    <dict>
      <key>CFBundleIconFiles</key>
      <array>
        <string></string>
      </array>
      <key>UINewsstandBindingEdge</key>
      <string>UINewsstandBindingEdgeLeft</string>
      <key>UINewsstandBindingType</key>
      <string>UINewsstandBindingTypeMagazine</string>
    </dict>
  </dict>
  ```
5.Usage:<br>
```
import ChangeAppIcon from 'react-native-change-appicon'; 



ChangeAppIcon.changeAppIconWithName('icon02.png');
```




