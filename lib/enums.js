'use strict';

exports.AclPrivate = 'private';
exports.AclPublicRead = 'public-read';
exports.AclPublicReadWrite = 'public-read-write';
exports.AclAuthenticatedRead = 'authenticated-read';
exports.AclBucketOwnerRead = 'bucket-owner-read';
exports.AclBucketOwnerFullControl = 'bucket-owner-full-control';
exports.AclLogDeliveryWrite = 'log-delivery-write';

exports.StorageClassStandard = 'STANDARD';
exports.StorageClassWarm = 'STANDARD_IA';
exports.StorageClassCold = 'GLACIER';

exports.PermissionRead = 'READ';
exports.PermissionWrite = 'WRITE';
exports.PermissionReadAcp = 'READ_ACP';
exports.PermissionWriteAcp = 'WRITE_ACP';
exports.PermissionFullControl = 'FULL_CONTROL';

exports.GroupAllUsers = 'http://acs.amazonaws.com/groups/global/AllUsers';
exports.GroupAuthenticatedUsers = 'http://acs.amazonaws.com/groups/global/AuthenticatedUsers';
exports.GroupLogDelivery = 'http://acs.amazonaws.com/groups/s3/LogDelivery';

exports.RestoreTierExpedited = 'Expedited';
exports.RestoreTierStandard = 'Standard';
exports.RestoreTierBulk = 'Bulk';

exports.GranteeGroup = 'Group';
exports.GranteeUser = 'CanonicalUser';

exports.CopyMetadata = 'COPY';
exports.ReplaceMetadata = 'REPLACE';