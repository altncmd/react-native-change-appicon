//
//  ChangeAppIcon.m
//  ChangeAppIcon
//
//  Created by Wendy on 5/19/18.
//  Copyright © 2018 Elroy. All rights reserved.
//

#import "ChangeAppIcon.h"
#import "RCTLog.h"

@implementation ChangeAppIcon

RCT_EXPORT_MODULE(ChangeAppIcon);
RCT_EXPORT_METHOD(changeAppIconWithName:(nonnull NSString *)iconName) {
    if (![[UIApplication sharedApplication] supportsAlternateIcons]) {
        return;
    }
    [[UIApplication sharedApplication] setAlternateIconName:iconName completionHandler:^(NSError * _Nullable error) {
        if (error) {
            RCTLogInfo(@"Change app icon failed: %@",error);
        }
    }];
}

@end
