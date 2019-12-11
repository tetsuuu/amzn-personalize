import { expect as expectCDK, matchTemplate, MatchStyle } from '@aws-cdk/assert';
import cdk = require('@aws-cdk/core');
import AmznPersonalize = require('../lib/amzn-personalize-stack');

test('Empty Stack', () => {
    const app = new cdk.App();
    // WHEN
    const stack = new AmznPersonalize.AmznPersonalizeStack(app, 'MyTestStack');
    // THEN
    expectCDK(stack).to(matchTemplate({
      "Resources": {}
    }, MatchStyle.EXACT))
});