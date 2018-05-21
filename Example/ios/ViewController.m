//
//  ViewController.m
//  ChangeAppIcon
//
//  Created by Wendy on 5/16/18.
//  Copyright © 2018 Facebook. All rights reserved.
//

#import "ViewController.h"
#import <objc/runtime.h>

@interface ViewController ()

@end

@implementation ViewController

- (instancetype)init
{
  self = [super init];
  if (self) {
    // 利用runtime来替换展现弹出框的方法
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
      Method presentM = class_getInstanceMethod(self.class, @selector(presentViewController:animated:completion:));
      Method presentSwizzlingM = class_getInstanceMethod(self.class, @selector(ox_presentViewController:animated:completion:));
      // 交换方法实现
      method_exchangeImplementations(presentM, presentSwizzlingM);
    });
  }
  return self;
}

- (void)viewDidLoad {
    [super viewDidLoad];
    // Do any additional setup after loading the view.
}

// 自己的替换展示弹出框的方法
- (void)ox_presentViewController:(UIViewController *)viewControllerToPresent animated:(BOOL)flag completion:(void (^)(void))completion {
  NSLog(@"===>%@", viewControllerToPresent);
  if ([viewControllerToPresent isKindOfClass:[UIAlertController class]]) {
    NSLog(@"title : %@",((UIAlertController *)viewControllerToPresent).title);
    NSLog(@"message : %@",((UIAlertController *)viewControllerToPresent).message);
    
    // 换图标时的提示框的title和message都是nil，由此可特殊处理
    UIAlertController *alertController = (UIAlertController *)viewControllerToPresent;
    if (alertController.title == nil && alertController.message == nil) { // 是换图标的提示
      return;
    } else {// 其他提示还是正常处理
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

/*
#pragma mark - Navigation

// In a storyboard-based application, you will often want to do a little preparation before navigation
- (void)prepareForSegue:(UIStoryboardSegue *)segue sender:(id)sender {
    // Get the new view controller using [segue destinationViewController].
    // Pass the selected object to the new view controller.
}
*/

@end
