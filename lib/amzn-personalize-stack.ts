import cdk = require('@aws-cdk/core');
import { Group, Policy, PolicyStatement, ManagedPolicy, User, Role, ServicePrincipal } from '@aws-cdk/aws-iam';
import { Bucket, BucketPolicy } from '@aws-cdk/aws-s3';
import AWS = require('aws-sdk');

export class AmznPersonalizeStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // S3 bucket
    const dataSetBucket = new Bucket(this, 'dataSet', {
      bucketName: 'shufti-dev-recommendation-asset',
    })

    const dataSetBucketPolicy = new BucketPolicy(this, 'bucketPolicy', {
      document:[],
    })

    // Amazon Personalize Assume Role
    const personalizeRole = new Role(this, 'personalizeRole', { 
      roleName: "AmazonPersonalizeS3AccessDevRole",
      assumedBy: new ServicePrincipal('personalize.amazonaws.com'),
    });

    // Allow S3 bucket list object plicy.
    const listObjectStatement = new PolicyStatement({
        resources: ["*"],
        actions: ["arn:aws:s3:::shufti-dev-recommendation-asset"]
    });

    const listObjectPolicy = new Policy(this, 'updateObject', {
      policyName: 'listObjectPolicy',
      statements: [listObjectStatement],
      roles: [personalizeRole],
    });

    // Allow S3 bucket update object plicy.
    const updateObjectStatement = new PolicyStatement({
      resources: ["arn:aws:s3:::shufti-dev-recommendation-asset/*"],
      actions: [
        "s3:GetObject",
        "s3:PutObject",
      ]
    });

    const updateObjectPolicy = new Policy(this, 'listObject', {
      policyName: 'updateObjectPolicy',
      statements: [updateObjectStatement],
      roles: [personalizeRole],
    });
  }
}
