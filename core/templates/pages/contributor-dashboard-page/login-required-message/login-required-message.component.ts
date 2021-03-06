// Copyright 2019 The Oppia Authors. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS-IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * @fileoverview Component for the item view of an opportunity.
 */

require('services/site-analytics.service.ts');
require('services/user.service.ts');

angular.module('oppia').component('loginRequiredMessage', {
  template: require('./login-required-message.component.html'),
  controller: [
    '$timeout', '$window', 'SiteAnalyticsService', 'UrlInterpolationService',
    'UserService', 'OPPIA_AVATAR_LINK_URL',
    function(
        $timeout, $window, SiteAnalyticsService, UrlInterpolationService,
        UserService, OPPIA_AVATAR_LINK_URL) {
      var ctrl = this;
      ctrl.onLoginButtonClicked = function() {
        UserService.getLoginUrlAsync().then(
          function(loginUrl) {
            if (loginUrl) {
              SiteAnalyticsService.registerStartLoginEvent('loginButton');
              $timeout(function() {
                $window.location = loginUrl;
              }, 150);
            } else {
              $window.location.reload();
            }
          }
        );
      };
      ctrl.$onInit = function() {
        ctrl.OPPIA_AVATAR_LINK_URL = OPPIA_AVATAR_LINK_URL;
        ctrl.OPPIA_AVATAR_IMAGE_URL = (
          UrlInterpolationService.getStaticImageUrl(
            '/avatar/oppia_avatar_100px.svg'));
      };
    }
  ]
});
