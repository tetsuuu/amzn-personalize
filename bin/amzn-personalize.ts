#!/usr/bin/env node
import 'source-map-support/register';
import cdk = require('@aws-cdk/core');
import { AmznPersonalizeStack } from '../lib/amzn-personalize-stack';

const app = new cdk.App();
new AmznPersonalizeStack(app, 'AmznPersonalizeStack');
