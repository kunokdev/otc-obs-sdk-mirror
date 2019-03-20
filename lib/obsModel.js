'use strict';

const owner = {
	'type' : 'object',
	'location' : 'xml',
	'sentAs' : 'Owner',
	'parameters' : {
		'ID' : {
			'sentAs' : 'ID',
		},
		'Name' : {
			'sentAs' : 'DisplayName',
		}
	}
};

const initiator = {
	'type' : 'object',
	'location' : 'xml',
	'sentAs' : 'Initiator',
	'parameters' : {
		'ID' : {
			'sentAs' : 'ID',
		},
		'Name' : {
			'sentAs' : 'DisplayName',
		},
	},
};
const commonPrefixes = {
	'type' : 'array',
	'location' : 'xml',
	'sentAs' : 'CommonPrefixes',
	'items' : {
		'type' : 'object',
		'parameters' : {
			'Prefix' : {
				'sentAs' : 'Prefix',
			},
		}
	}
};

const grants = {
	'type' : 'object',
	'location' : 'xml',
	'sentAs' : 'AccessControlList',
	'parameters' : {
		'Grant' : {
			'type' : 'array',
			'sentAs' : 'Grant',
			'items' : {
				'type' : 'object',
				'parameters' : {
					'Grantee' : {
						'data' : {
							'xsiNamespace' : 'http://www.w3.org/2001/XMLSchema-instance',
							'xsiType' : 'Type',
						},
						'type' : 'object',
						'sentAs' : 'Grantee',
						'parameters' : {
							'Type' : {
								'type' : 'ignore',
							},
							'ID' : {
								'sentAs' : 'ID',
							},
							'Name' : {
								'sentAs' : 'DisplayName',
							},
							'URI' : {
								'sentAs' : 'URI',
							}
						},
					},
					'Permission' : {
						'sentAs' : 'Permission',
					},
				},
			},
		}
	}
};

const loggingEnabled = {
	'type' : 'object',
	'location' : 'xml',
	'sentAs' : 'LoggingEnabled',
	'parameters' : {
		'TargetBucket' : {
			'sentAs' : 'TargetBucket',
		},
		'TargetPrefix' : {
			'sentAs' : 'TargetPrefix',
		},
		'TargetGrants' : {
			'type' : 'object',
			'sentAs' : 'TargetGrants',
			'parameters' : {
				'Grant' : {
					'type' : 'array',
					'sentAs' : 'Grant',
					'items' : {
						'type' : 'object',
						'parameters' : {
							'Grantee' : {
								'data' : {
									'xsiNamespace' : 'http://www.w3.org/2001/XMLSchema-instance',
									'xsiType' : 'Type',
								},
								'type' : 'object',
								'sentAs' : 'Grantee',
								'parameters' : {
									'Type' : {
										'type' : 'ignore',
									},
									'ID' : {
										'sentAs' : 'ID',
									},
									'Name' : {
										'sentAs' : 'DisplayName',
									},
									'URI' : {
										'sentAs' : 'URI',
									}
								},
							},
							'Permission' : {
								'sentAs' : 'Permission',
							},
						},
					},
				}
			}
		},
	},
};

const rules = {
	'required' : true,
	'type' : 'array',
	'location' : 'xml',
	'sentAs' : 'Rule',
	'items' : {
		'type' : 'object',
		'parameters' : {
			'ID' : {
				'sentAs' : 'ID',
			},
			'Prefix' : {
				'sentAs' : 'Prefix',
			},
			'Status' : {
				'sentAs' : 'Status',
			},
			'Transitions' : {
				'type' : 'array',
				'sentAs' : 'Transition',
				'items' : {
					'type' : 'object',
					'parameters' : {
						'StorageClass' :{
							'sentAs' : 'StorageClass'
						},
						'Date' : {
							'sentAs' : 'Date',
						},
						'Days' : {
							'type' : 'number',
							'sentAs' : 'Days'
						}
					}
				}
			},
			'Expiration' : {
				'type' : 'object',
				'sentAs' : 'Expiration',
				'parameters' : {
					'Date' : {
						'sentAs' : 'Date',
					},
					'Days' : {
						'type' : 'number',
						'sentAs' : 'Days'
					},
				},
			},
			'NoncurrentVersionTransitions' :{
				'type' : 'array',
				'sentAs' : 'NoncurrentVersionTransition',
				'items' : {
					'type' : 'object',
					'parameters' : {
						'StorageClass' :{
							'sentAs' : 'StorageClass'
						},
						'NoncurrentDays' : {
							'type' : 'number',
							'sentAs' : 'NoncurrentDays'
						}
					}
				}
			},
			'NoncurrentVersionExpiration' : {
				'type' : 'object',
				'sentAs' : 'NoncurrentVersionExpiration',
				'parameters' : {
					'NoncurrentDays' : {
						'type' : 'number',
						'sentAs' : 'NoncurrentDays',
					},
				},
			}
		},
	},
};

const redirectAllRequestsTo = {
	'type' : 'object',
	'location' : 'xml',
	'sentAs' : 'RedirectAllRequestsTo',
	'parameters' : {
		'HostName' : {
			'sentAs' : 'HostName',
		},
		'Protocol' : {
			'sentAs' : 'Protocol',
		},
	}
};

const routingRules = {
	'type' : 'object',
	'location' : 'xml',
	'sentAs' : 'RoutingRules',
	'parameters' : {
		'RoutingRule' : {
			'type' : 'array',
			'sentAs' : 'RoutingRule',
			'items' : {
				'type' : 'object',
				'parameters' : {
					'Condition' : {
						'type' : 'object',
						'sentAs' : 'Condition',
						'parameters' : {
							'HttpErrorCodeReturnedEquals' : {
								'sentAs' : 'HttpErrorCodeReturnedEquals',
							},
							'KeyPrefixEquals' : {
								'sentAs' : 'KeyPrefixEquals',
							},
						},
					},
					'Redirect' : {
						'type' : 'object',
						'sentAs' : 'Redirect',
						'parameters' : {
							'HostName' : {
								'sentAs' : 'HostName',
							},
							'HttpRedirectCode' : {
								'sentAs' : 'HttpRedirectCode',
							},
							'Protocol' : {
								'sentAs' : 'Protocol',
							},
							'ReplaceKeyPrefixWith' : {
								'sentAs' : 'ReplaceKeyPrefixWith',
							},
							'ReplaceKeyWith' : {
								'sentAs' : 'ReplaceKeyWith',
							}
						}
					},
				},
			},
		}
	},
};

const indexDocument = {
	'type' : 'object',
	'location' : 'xml',
	'sentAs' : 'IndexDocument',
	'parameters' : {
		'Suffix' : {
			'sentAs' : 'Suffix',
		},
	}
};

const errorDocument = {
	'type' : 'object',
	'location' : 'xml',
	'sentAs' : 'ErrorDocument',
	'parameters' : {
		'Key' : {
			'sentAs' : 'Key',
		},
	}
};

const corsRule = {
	'required' : true,
	'type' : 'array',
	'location' : 'xml',
	'sentAs' : 'CORSRule',
	'items' : {
		'type' : 'object',
		'parameters' : {
			'ID' : {
				'sentAs' : 'ID',
			},
			'AllowedMethod' : {
				'type' : 'array',
				'sentAs' : 'AllowedMethod',
				'items' : {
					'type' : 'string',
				},
			},
			'AllowedOrigin' : {
				'type' : 'array',
				'sentAs' : 'AllowedOrigin',
				'items' : {
					'type' : 'string',
				},
			},
			'AllowedHeader' : {
				'type' : 'array',
				'sentAs' : 'AllowedHeader',
				'items' : {
					'type' : 'string',
				},
			},
			'MaxAgeSeconds' : {
				'type' : 'number',
				'sentAs' : 'MaxAgeSeconds',
			},
			'ExposeHeader' : {
				'type' : 'array',
				'sentAs' : 'ExposeHeader',
				'items' : {
					'type' : 'string',
				},
			},
		},
	},
};

const topicConfiguration = {
	'type' : 'array',
	'location' : 'xml',
	'sentAs' : 'TopicConfiguration',
	'items' : {
		'type' : 'object',
		'location' : 'xml',
		'parameters' : {
			'ID' : {
				'sentAs' : 'Id'
			},
			'Filter' : {
				'type' : 'object',
				'parameters' : {
					'FilterRule' : {
						'wrapper' : 'S3Key',
						'type' : 'array',
						'items' : {
							'type' : 'object',
							'parameters' : {
								'Name' : {},
								'Value' : {}
							}
						}
					}
				}
			},
			'Topic' : {},
	
			'Event' : {
				'type' : 'array',
				'items' : {
					'type' : 'string'
				}
			}
		}
	}
};

const tagSet = {
	'required' : true,
	'type' : 'object',
	'location' : 'xml',
	'sentAs' : 'TagSet',
	'parameters' : {
		'Tag' : {
			'type' : 'array',
			'sentAs' : 'Tag',
			'items' : {
				'type' : 'object',
				'parameters' : {
					'Key' : {
						'sentAs' : 'Key',
					},
					'Value' : {
						'sentAs' : 'Value',
					}
				}
			}
		}
	}
};

const operations = {
	'CreateBucket' : {
		'httpMethod' : 'PUT',
		'data' : {
			'xmlRoot' : 'CreateBucketConfiguration',
			'namespace' : 'http://s3.amazonaws.com/doc/2006-03-01/',
		},
		'parameters' : {
			'Bucket' : {
				'required' : true,
				'location' : 'uri',
			},
			'ACL' : {
				'location' : 'header',
				'sentAs' : 'x-amz-acl',
			},
			'StorageClass' : {
				'location' : 'header',
				'sentAs' : 'x-default-storage-class',
			},
			'Location' : {
				'location' : 'xml',
				'sentAs' : 'LocationConstraint',
			}
		}
	},

	'CreateBucketOutput' : {
		'parameters' : {
			'RequestId' : {
				'location' : 'header',
				'sentAs' : 'x-amz-request-id',
			},
		}
	},

	'ListBuckets' : {
		'httpMethod' : 'GET',
	},

	'ListBucketsOutput' : {
		'data' : {
			'type' : 'xml',
			'xmlRoot' : 'ListAllMyBucketsResult',
		},
		'parameters' : {
			'RequestId' : {
				'location' : 'header',
				'sentAs' : 'x-amz-request-id',
			},
			'Owner' : {
				'type' : 'object',
				'location' : 'xml',
				'sentAs' : 'Owner',
				'parameters' : {
					'ID' : {
						'sentAs' : 'ID',
					},
					'Name' : {
						'sentAs' : 'DisplayName',
					},
				},

			},
			'Buckets' : {
				'type' : 'object',
				'location' : 'xml',
				'sentAs' : 'Buckets',
				'parameters' : {
					'Bucket' : {
						'type' : 'array',
						'sentAs' : 'Bucket',
						'items' : {
							'type' : 'object',
							'parameters' : {
								'BucketName' : {
									'sentAs' : 'Name',
								},
								'CreationDate' : {
									'type' : 'date',
									'sentAs' : 'CreationDate'
								},
							},

						},
					},
				},
			},
		},
	},

	'HeadBucket' : {
		'httpMethod' : 'HEAD',
		'parameters' : {
			'Bucket' : {
				'required' : true,
				'location' : 'uri',
			},

			'Origin' : {
				'location' : 'header',
				'sentAs' : 'Origin'
			},

			'RequestHeader' : {
				'location' : 'header',
				'sentAs' : 'Access-Control-Request-Headers'
			}
		},
	},

	'HeadBucketOutput' : {
		'parameters' : {
			'RequestId' : {
				'location' : 'header',
				'sentAs' : 'x-amz-request-id',
			},
			'StorageClass' : {
				'location' : 'header',
				'sentAs' : 'x-default-storage-class'
			},
			'AllowOrigin' : {
				'location' : 'header',
				'sentAs' : 'access-control-allow-origin'
			},
			'MaxAgeSeconds' : {
				'location' : 'header',
				'sentAs' : 'access-control-max-age'
			},
			'ExposeHeader' : {
				'location' : 'header',
				'sentAs' : 'access-control-expose-headers'
			},
			'AllowMethod' : {
				'location' : 'header',
				'sentAs' : 'access-control-allow-methods'
			},
			'AllowHeader' : {
				'location' : 'header',
				'sentAs' : 'access-control-allow-headers'
			}
		}
	},

	'DeleteBucket' : {
		'httpMethod' : 'DELETE',
		'parameters' : {
			'Bucket' : {
				'required' : true,
				'location' : 'uri',
			},
		},
	},
	'DeleteBucketOutput' : {
		'parameters' : {
			'RequestId' : {
				'location' : 'header',
				'sentAs' : 'x-amz-request-id',
			},
		},
	},

	'ListObjects' : {
		'httpMethod' : 'GET',
		'parameters' : {
			'Bucket' : {
				'required' : true,
				'location' : 'uri',
			},
			'Prefix' : {
				'location' : 'urlPath',
				'sentAs' : 'prefix',
			},
			'Marker' : {
				'location' : 'urlPath',
				'sentAs' : 'marker',
			},
			'MaxKeys' : {
				'type' : 'number',
				'location' : 'urlPath',
				'sentAs' : 'max-keys',
			},
			'Delimiter' : {
				'location' : 'urlPath',
				'sentAs' : 'delimiter',
			},
		},
	},

	'ListObjectsOutput' : {
		'data' : {
			'type' : 'xml',
			'xmlRoot' : 'ListBucketResult',
		},
		'parameters' : {
			'RequestId' : {
				'location' : 'header',
				'sentAs' : 'x-amz-request-id',
			},
			'Location' : {
				'location' : 'header',
				'sentAs' : 'x-amz-bucket-region',
			},
			'Bucket' : {
				'location' : 'xml',
				'sentAs' : 'Name',
			},
			'Delimiter' : {
				'location' : 'xml',
				'sentAs' : 'Delimiter',
			},
			'IsTruncated' : {
				'location' : 'xml',
				'sentAs' : 'IsTruncated',
			},
			'Prefix' : {
				'location' : 'xml',
				'sentAs' : 'Prefix',
			},
			'Marker' : {
				'location' : 'xml',
				'sentAs' : 'Marker',
			},
			'NextMarker' : {
				'location' : 'xml',
				'sentAs' : 'NextMarker',
			},
			'MaxKeys' : {
				'location' : 'xml',
				'sentAs' : 'MaxKeys',
			},
			'Contents' : {
				'type' : 'array',
				'location' : 'xml',
				'sentAs' : 'Contents',
				'items' : {
					'type' : 'object',
					'parameters' : {
						'Key' : {
							'sentAs' : 'Key',
						},
						'LastModified' : {
							'type' : 'date',
							'sentAs' : 'LastModified',
						},
						'ETag' : {
							'sentAs' : 'ETag',
						},
						'Size' : {
							'sentAs' : 'Size',
						},
						'StorageClass' : {
							'sentAs' : 'StorageClass',
						},
						'Owner' : owner
					},
				},

			},
			'CommonPrefixes' : commonPrefixes
		},
	},

	'ListVersions' : {
		'httpMethod' : 'GET',
		'urlPath' : 'versions',
		'parameters' : {
			'Bucket' : {
				'required' : true,
				'location' : 'uri',
			},
			'Prefix' : {
				'location' : 'urlPath',
				'sentAs' : 'prefix',
			},
			'KeyMarker' : {
				'location' : 'urlPath',
				'sentAs' : 'key-marker',
			},
			'MaxKeys' : {
				'type' : 'number',
				'location' : 'urlPath',
				'sentAs' : 'max-keys',
			},
			'Delimiter' : {
				'location' : 'urlPath',
				'sentAs' : 'delimiter',
			},
			'VersionIdMarker' : {
				'location' : 'urlPath',
				'sentAs' : 'version-id-marker',
			},
		},
	},
	'ListVersionsOutput' : {
		'data' : {
			'type' : 'xml',
			'xmlRoot' : 'ListVersionsResult',
		},
		'parameters' : {
			'RequestId' : {
				'location' : 'header',
				'sentAs' : 'x-amz-request-id',
			},
			'Location' : {
				'location' : 'header',
				'sentAs' : 'x-amz-bucket-region',
			},
			'Bucket' : {
				'location' : 'xml',
				'sentAs' : 'Name',
			},
			'Prefix' : {
				'location' : 'xml',
				'sentAs' : 'Prefix',
			},
			'Delimiter' : {
				'location' : 'xml',
				'sentAs' : 'Delimiter',
			},
			'KeyMarker' : {
				'location' : 'xml',
				'sentAs' : 'KeyMarker',
			},
			'VersionIdMarker' : {
				'location' : 'xml',
				'sentAs' : 'VersionIdMarker',
			},
			'NextKeyMarker' : {
				'location' : 'xml',
				'sentAs' : 'NextKeyMarker',
			},
			'NextVersionIdMarker' : {
				'location' : 'xml',
				'sentAs' : 'NextVersionIdMarker',
			},
			'MaxKeys' : {
				'location' : 'xml',
				'sentAs' : 'MaxKeys',
			},
			'IsTruncated' : {
				'location' : 'xml',
				'sentAs' : 'IsTruncated',
			},
			'Versions' : {
				'type' : 'array',
				'location' : 'xml',
				'sentAs' : 'Version',
				'items' : {
					'type' : 'object',
					'parameters' : {
						'Key' : {
							'sentAs' : 'Key',
						},
						'VersionId' : {
							'sentAs' : 'VersionId',
						},
						'IsLatest' : {
							'sentAs' : 'IsLatest',
						},
						'LastModified' : {
							'type' : 'date',
							'sentAs' : 'LastModified',
						},
						'ETag' : {
							'sentAs' : 'ETag',
						},
						'Size' : {
							'sentAs' : 'Size',
						},
						'Owner' : owner,
						'StorageClass' : {
							'sentAs' : 'StorageClass',
						}
					}
				},
			},
			'DeleteMarkers' : {
				'type' : 'array',
				'location' : 'xml',
				'sentAs' : 'DeleteMarker',
				'items' : {
					'type' : 'object',
					'parameters' : {
						'Key' : {
							'sentAs' : 'Key',
						},
						'VersionId' : {
							'sentAs' : 'VersionId',
						},
						'IsLatest' : {
							'sentAs' : 'IsLatest',
						},
						'LastModified' : {
							'type' : 'date',
							'sentAs' : 'LastModified',
						},
						'Owner' : owner
					}
				},
			},
			'CommonPrefixes' : commonPrefixes
		},
	},

	'GetBucketLocation' : {
		'httpMethod' : 'GET',
		'urlPath' : 'location',
		'parameters' : {
			'Bucket' : {
				'required' : true,
				'location' : 'uri',
			},
		},
	},

	'GetBucketLocationOutput' : {
		'data' : {
			'type' : 'xml',
			'xmlRoot' : 'CreateBucketConfiguration',
		},
		'parameters' : {
			'RequestId' : {
				'location' : 'header',
				'sentAs' : 'x-amz-request-id',
			},
			'Location' : {
				'location' : 'xml',
				'sentAs' : 'LocationConstraint',
			},
		},
	},

	'GetBucketStorageInfo' : {
		'httpMethod' : 'GET',
		'urlPath' : 'storageinfo',
		'parameters' : {
			'Bucket' : {
				'required' : true,
				'location' : 'uri',
			},
		},
	},
	'GetBucketStorageInfoOutput' : {
		'data' : {
			'type' : 'xml',
			'xmlRoot' : 'GetBucketStorageInfoResult',
		},
		'parameters' : {
			'RequestId' : {
				'location' : 'header',
				'sentAs' : 'x-amz-request-id',
			},
			'Size' : {
				'location' : 'xml',
				'sentAs' : 'Size',
			},
			'ObjectNumber' : {
				'location' : 'xml',
				'sentAs' : 'ObjectNumber',
			},
		},
	},

	'SetBucketQuota' : {
		'httpMethod' : 'PUT',
		'urlPath' : 'quota',
		'data' : {
			'xmlRoot' : 'Quota',
			'namespace' : 'http://s3.amazonaws.com/doc/2006-03-01/',
		},
		'parameters' : {
			'Bucket' : {
				'required' : true,
				'location' : 'uri',
			},
			'StorageQuota' : {
				'required' : true,
				'location' : 'xml',
				'sentAs' : 'StorageQuota',
			},
		},
	},
	'SetBucketQuotaOutput' : {
		'parameters' : {
			'RequestId' : {
				'location' : 'header',
				'sentAs' : 'x-amz-request-id',
			},
		}
	},

	'GetBucketQuota' : {
		'httpMethod' : 'GET',
		'urlPath' : 'quota',
		'parameters' : {
			'Bucket' : {
				'required' : true,
				'location' : 'uri',
			},

		},
	},
	'GetBucketQuotaOutput' : {
		'data' : {
			'type' : 'xml',
			'xmlRoot' : 'Quota',
		},
		'parameters' : {
			'RequestId' : {
				'location' : 'header',
				'sentAs' : 'x-amz-request-id',
			},
			'StorageQuota' : {
				'location' : 'xml',
				'sentAs' : 'StorageQuota',
			},
		},
	},

	'SetBucketAcl' : {
		'httpMethod' : 'PUT',
		'urlPath' : 'acl',
		'data' : {
			'xmlRoot' : 'AccessControlPolicy',
			'namespace' : 'http://s3.amazonaws.com/doc/2006-03-01/',
		},
		'parameters' : {
			'Bucket' : {
				'required' : true,
				'location' : 'uri',
			},
			'ACL' : {
				'location' : 'header',
				'sentAs' : 'x-amz-acl',
			},
			'Owner' : owner,
			'Grants' : grants
		},
	},
	'SetBucketAclOutput' : {
		'parameters' : {
			'RequestId' : {
				'location' : 'header',
				'sentAs' : 'x-amz-request-id',
			},
		},
	},
	'GetBucketAcl' : {
		'httpMethod' : 'GET',
		'urlPath' : 'acl',
		'parameters' : {
			'Bucket' : {
				'required' : true,
				'location' : 'uri',
			},
		},
	},
	'GetBucketAclOutput' : {
		'data' : {
			'type' : 'xml',
			'xmlRoot' : 'AccessControlPolicy',
		},
		'parameters' : {
			'RequestId' : {
				'location' : 'header',
				'sentAs' : 'x-amz-request-id',
			},
			'Owner' : owner,
			'Grants' : grants
		}
	},

	'SetBucketLoggingConfiguration' : {
		'httpMethod' : 'PUT',
		'urlPath' : 'logging',
		'data' : {
			'xmlRoot' : 'BucketLoggingStatus',
			'namespace' : 'http://s3.amazonaws.com/doc/2006-03-01/',
		},
		'parameters' : {
			'Bucket' : {
				'required' : true,
				'location' : 'uri',
			},
			'LoggingEnabled' : loggingEnabled,
		},
	},

	'SetBucketLoggingConfigurationOutput' : {
		'parameters' : {
			'RequestId' : {
				'location' : 'header',
				'sentAs' : 'x-amz-request-id',
			},
		}
	},

	'GetBucketLoggingConfiguration' : {
		'httpMethod' : 'GET',
		'urlPath' : 'logging',
		'parameters' : {
			'Bucket' : {
				'required' : true,
				'location' : 'uri',
			},
		},
	},
	'GetBucketLoggingConfigurationOutput' : {
		'data' : {
			'type' : 'xml',
			'xmlRoot' : 'BucketLoggingStatus',
		},
		'parameters' : {
			'RequestId' : {
				'location' : 'header',
				'sentAs' : 'x-amz-request-id',
			},
			'LoggingEnabled' : loggingEnabled,
		},
	},

	'SetBucketPolicy' : {
		'httpMethod' : 'PUT',
		'urlPath' : 'policy',
		'parameters' : {
			'Bucket' : {
				'required' : true,
				'location' : 'uri',
			},
			'Policy' : {
				'required' : true,
				'location' : 'body',
			},
		},
	},
	'SetBucketPolicyOutput' : {
		'parameters' : {
			'RequestId' : {
				'location' : 'header',
				'sentAs' : 'x-amz-request-id',
			},
		},
	},
	'GetBucketPolicy' : {
		'httpMethod' : 'GET',
		'urlPath' : 'policy',
		'parameters' : {
			'Bucket' : {
				'required' : true,
				'location' : 'uri',
			},
		},
	},
	'GetBucketPolicyOutput' : {
		'data' : {
			'type' : 'body',
		},
		'parameters' : {
			'Policy' : {
				'location' : 'body',
			},
			'RequestId' : {
				'location' : 'header',
				'sentAs' : 'x-amz-request-id',
			},
		},
	},
	'DeleteBucketPolicy' : {
		'httpMethod' : 'DELETE',
		'urlPath' : 'policy',
		'parameters' : {
			'Bucket' : {
				'required' : true,
				'location' : 'uri',
			},
		},
	},
	'DeleteBucketPolicyOutput' : {
		'parameters' : {
			'RequestId' : {
				'location' : 'header',
				'sentAs' : 'x-amz-request-id',
			},
		},
	},

	'SetBucketLifecycleConfiguration' : {
		'httpMethod' : 'PUT',
		'urlPath' : 'lifecycle',
		'data' : {
			'xmlRoot' : 'LifecycleConfiguration',
			'namespace' : 'http://s3.amazonaws.com/doc/2006-03-01/',
			'md5' : true
		},
		'parameters' : {
			'Bucket' : {
				'required' : true,
				'location' : 'uri',
			},
			'Rules' : rules
		},
	},
	'SetBucketLifecycleConfigurationOutput' : {
		'parameters' : {
			'RequestId' : {
				'location' : 'header',
				'sentAs' : 'x-amz-request-id',
			},
		}
	},

	'GetBucketLifecycleConfiguration' : {
		'httpMethod' : 'GET',
		'urlPath' : 'lifecycle',
		'parameters' : {
			'Bucket' : {
				'required' : true,
				'location' : 'uri',
			},
		},
	},
	'GetBucketLifecycleConfigurationOutput' : {
		'data' : {
			'type' : 'xml',
			'xmlRoot' : 'LifecycleConfiguration',
		},
		'parameters' : {
			'RequestId' : {
				'location' : 'header',
				'sentAs' : 'x-amz-request-id',
			},
			'Rules' : rules
		},
	},
	'DeleteBucketLifecycleConfiguration' : {
		'httpMethod' : 'DELETE',
		'urlPath' : 'lifecycle',
		'parameters' : {
			'Bucket' : {
				'required' : true,
				'location' : 'uri',
			},
		},
	},
	'DeleteBucketLifecycleConfigurationOutput' : {
		'parameters' : {
			'RequestId' : {
				'location' : 'header',
				'sentAs' : 'x-amz-request-id',
			},
		},
	},

	'SetBucketWebsiteConfiguration' : {
		'httpMethod' : 'PUT',
		'urlPath' : 'website',
		'data' : {
			'xmlRoot' : 'WebsiteConfiguration',
			'namespace' : 'http://s3.amazonaws.com/doc/2006-03-01/',
		},
		'parameters' : {
			'Bucket' : {
				'required' : true,
				'location' : 'uri',
			},
			'RedirectAllRequestsTo' : redirectAllRequestsTo,
			'IndexDocument' : indexDocument,
			'ErrorDocument' : errorDocument,
			'RoutingRules' : routingRules
		},
	},
	'SetBucketWebsiteConfigurationOutput' : {
		'parameters' : {
			'RequestId' : {
				'location' : 'header',
				'sentAs' : 'x-amz-request-id',
			},
		}
	},
	'GetBucketWebsiteConfiguration' : {
		'httpMethod' : 'GET',
		'urlPath' : 'website',
		'parameters' : {
			'Bucket' : {
				'required' : true,
				'location' : 'uri',
			},
		},
	},
	'GetBucketWebsiteConfigurationOutput' : {
		'data' : {
			'type' : 'xml',
			'xmlRoot' : 'WebsiteConfiguration',
		},
		'parameters' : {
			'RequestId' : {
				'location' : 'header',
				'sentAs' : 'x-amz-request-id',
			},
			'RedirectAllRequestsTo' : redirectAllRequestsTo,
			'IndexDocument' : indexDocument,
			'ErrorDocument' : errorDocument,
			'RoutingRules' : routingRules,
		},
	},
	'DeleteBucketWebsiteConfiguration' : {
		'httpMethod' : 'DELETE',
		'urlPath' : 'website',
		'parameters' : {
			'Bucket' : {
				'required' : true,
				'location' : 'uri',
			},
		},
	},
	'DeleteBucketWebsiteConfigurationOutput' : {
		'parameters' : {
			'RequestId' : {
				'location' : 'header',
				'sentAs' : 'x-amz-request-id',
			},
		}
	},

	'SetBucketVersioningConfiguration' : {
		'httpMethod' : 'PUT',
		'urlPath' : 'versioning',
		'data' : {
			'xmlRoot' : 'VersioningConfiguration',
			'namespace' : 'http://s3.amazonaws.com/doc/2006-03-01/'
		},
		'parameters' : {
			'Bucket' : {
				'required' : true,
				'location' : 'uri',
			},
			'VersionStatus' : {
				'required' : true,
				'location' : 'xml',
				'sentAs' : 'Status',
			},
		},
	},
	'SetBucketVersioningConfigurationOutput' : {
		'parameters' : {
			'RequestId' : {
				'location' : 'header',
				'sentAs' : 'x-amz-request-id',
			},
		},
	},
	'GetBucketVersioningConfiguration' : {
		'httpMethod' : 'GET',
		'urlPath' : 'versioning',
		'parameters' : {
			'Bucket' : {
				'required' : true,
				'location' : 'uri',
			},
		},
	},
	'GetBucketVersioningConfigurationOutput' : {
		'data' : {
			'type' : 'xml',
			'xmlRoot' : 'VersioningConfiguration',
		},
		'parameters' : {
			'RequestId' : {
				'location' : 'header',
				'sentAs' : 'x-amz-request-id',
			},
			'VersionStatus' : {
				'location' : 'xml',
				'sentAs' : 'Status',
			},
		},
	},

	'SetBucketCors' : {
		'httpMethod' : 'PUT',
		'urlPath' : 'cors',
		'data' : {
			'xmlRoot' : 'CORSConfiguration',
			'namespace' : 'http://s3.amazonaws.com/doc/2006-03-01/',
			'md5' : true
		},
		'parameters' : {
			'Bucket' : {
				'required' : true,
				'location' : 'uri',
			},
			'CorsRule' : corsRule
		},
	},
	'SetBucketCorsOutput' : {
		'parameters' : {
			'RequestId' : {
				'location' : 'header',
				'sentAs' : 'x-amz-request-id',
			},
		},
	},
	'GetBucketCors' : {
		'httpMethod' : 'GET',
		'urlPath' : 'cors',
		'parameters' : {
			'Bucket' : {
				'required' : true,
				'location' : 'uri',
			},
		},
	},
	'GetBucketCorsOutput' : {
		'data' : {
			'type' : 'xml',
			'xmlRoot' : 'CORSConfiguration',
		},
		'parameters' : {
			'RequestId' : {
				'location' : 'header',
				'sentAs' : 'x-amz-request-id',
			},
			'CorsRule' : corsRule
		},
	},
	'DeleteBucketCors' : {
		'httpMethod' : 'DELETE',
		'urlPath' : 'cors',
		'parameters' : {
			'Bucket' : {
				'required' : true,
				'location' : 'uri',
			},
		},
	},
	'DeleteBucketCorsOutput' : {
		'parameters' : {
			'RequestId' : {
				'location' : 'header',
				'sentAs' : 'x-amz-request-id',
			},
		},
	},

	'SetBucketNotification' : {
		'httpMethod' : 'PUT',
		'urlPath' : 'notification',
		'data' : {
			'xmlRoot' : 'NotificationConfiguration',
			'namespace' : 'http://s3.amazonaws.com/doc/2006-03-01/'
		},
		'parameters' : {
			'Bucket' : {
				'required' : true,
				'location' : 'uri'
			},
			'TopicConfigurations' : topicConfiguration
		}
	},

	'SetBucketNotificationOutput' : {
		'parameters' : {
			'RequestId' : {
				'location' : 'header',
				'sentAs' : 'x-amz-request-id',
			},
		},
	},

	'GetBucketNotification' : {
		'httpMethod' : 'GET',
		'urlPath' : 'notification',
		'parameters' : {
			'Bucket' : {
				'required' : true,
				'location' : 'uri',
			},
		}
	},

	'GetBucketNotificationOutput' : {
		'data' : {
			'type' : 'xml',
			'xmlRoot' : 'NotificationConfiguration',
		},
		'parameters' : {
			'RequestId' : {
				'location' : 'header',
				'sentAs' : 'x-amz-request-id',
			},
			'TopicConfigurations' : topicConfiguration
		},
	},

	'OptionsBucket' : {
		'httpMethod' : 'OPTIONS',
		'parameters' : {
			'Bucket' : {
				'required' : true,
				'location' : 'uri',
			},
			'Origin' : {
				'required' : true,
				'location' : 'header',
				'sentAs' : 'Origin',
			},
			'AccessControlRequestMethods' : {
				'required' : true,
				'type' : 'array',
				'location' : 'header',
				'sentAs' : 'Access-Control-Request-Method',
				'items' : {
					'type' : 'string',
				},
			},
			'AccessControlRequestHeaders' : {
				'type' : 'array',
				'location' : 'header',
				'sentAs' : 'Access-Control-Request-Headers',
				'items' : {
					'type' : 'string',
				},
			},
		},
	},
	'OptionsBucketOutput' : {
		'parameters' : {
			'RequestId' : {
				'location' : 'header',
				'sentAs' : 'x-amz-request-id',
			},
			'AllowOrigin' : {
				'location' : 'header',
				'sentAs' : 'access-control-allow-origin',
			},
			'AllowHeader' : {
				'location' : 'header',
				'sentAs' : 'access-control-allow-headers',
			},
			'AllowMethod' : {
				'location' : 'header',
				'sentAs' : 'access-control-allow-methods',
			},
			'ExposeHeader' : {
				'location' : 'header',
				'sentAs' : 'access-control-expose-headers',
			},
			'MaxAgeSeconds' : {
				'location' : 'header',
				'sentAs' : 'access-control-max-age',
			},
		},
	},

	'SetBucketTagging' : {
		'httpMethod' : 'PUT',
		'urlPath' : 'tagging',
		'data' : {
			'xmlRoot' : 'Tagging',
			'namespace' : 'http://s3.amazonaws.com/doc/2006-03-01/',
			'md5' : true
		},
		'parameters' : {
			'Bucket' : {
				'required' : true,
				'location' : 'uri'
			},
			'TagSet' : tagSet
		}
	},

	'SetBucketTaggingOutput' : {
		'parameters' : {
			'RequestId' : {
				'location' : 'header',
				'sentAs' : 'x-amz-request-id',
			},
		}
	},

	'DeleteBucketTagging' : {
		'httpMethod' : 'DELETE',
		'urlPath' : 'tagging',
		'parameters' : {
			'Bucket' : {
				'required' : true,
				'location' : 'uri',
			},
		}
	},

	'DeleteBucketTaggingOutput' : {
		'parameters' : {
			'RequestId' : {
				'location' : 'header',
				'sentAs' : 'x-amz-request-id',
			},
		}
	},

	'GetBucketTagging' : {
		'httpMethod' : 'GET',
		'urlPath' : 'tagging',
		'parameters' : {
			'Bucket' : {
				'required' : true,
				'location' : 'uri',
			},
		}
	},

	'GetBucketTaggingOutput' : {
		'data' : {
			'type' : 'xml',
			'xmlRoot' : 'Tagging',
		},
		'parameters' : {
			'RequestId' : {
				'location' : 'header',
				'sentAs' : 'x-amz-request-id',
			},
			'TagSet' : tagSet
		}
	},
	
	'SetBucketStoragePolicy' : {
		'httpMethod' : 'PUT',
		'urlPath' : 'storagePolicy',
		'data' : {
			'xmlRoot' : 'StoragePolicy',
			'namespace' : 'http://s3.amazonaws.com/doc/2006-03-01/'
		},
		'parameters' : {
			'Bucket' : {
				'required' : true,
				'location' : 'uri',
			},
			'StorageClass' :{
				'required' : true,
				'location' : 'xml',
				'type' : 'string',
				'sentAs' : 'DefaultStorageClass'
			}
		}
	},
	
	'SetBucketStoragePolicyOutput' : {
		'parameters' : {
			'RequestId' : {
				'location' : 'header',
				'sentAs' : 'x-amz-request-id',
			}
		}
	},
	
	'GetBucketStoragePolicy' :{
		'httpMethod' : 'GET',
		'urlPath' : 'storagePolicy',
		'parameters' : {
			'Bucket' : {
				'required' : true,
				'location' : 'uri',
			},
		}
	},
	
	'GetBucketStoragePolicyOutput' :{
		'data' : {
			'type' : 'xml',
			'xmlRoot' : 'StoragePolicy',
		},
		'parameters' : {
			'RequestId' : {
				'location' : 'header',
				'sentAs' : 'x-amz-request-id',
			},
			'StorageClass' : {
				'location' : 'xml',
				'type' : 'string',
				'sentAs' : 'DefaultStorageClass'
			}
		}
	},

	'PutObject' : {
		'httpMethod' : 'PUT',
		'parameters' : {
			'Bucket' : {
				'required' : true,
				'location' : 'uri',
			},
			'Key' : {
				'required' : true,
				'location' : 'uri',
			},
			'ContentMD5' : {
				'location' : 'header',
				'sentAs' : 'Content-MD5',
			},
			'ContentType' : {
				'location' : 'header',
				'sentAs' : 'content-type'
			},
			'ContentLength' :{
				'location' : 'header',
				'sentAs' : 'content-length',
				'type' : 'plain'
			},
			'ACL' : {
				'location' : 'header',
				'sentAs' : 'x-amz-acl',
			},
			'StorageClass' : {
				'location' : 'header',
				'sentAs' : 'x-amz-storage-class',
			},
			'Metadata' : {
				'type' : 'object',
				'location' : 'header',
				'sentAs' : 'x-amz-meta-',
			},
			'WebsiteRedirectLocation' : {
				'location' : 'header',
				'sentAs' : 'x-amz-website-redirect-location',
			},
			'SseKms' :{
				'location' : 'header',
				'sentAs' : 'x-amz-server-side-encryption'
			},
			'SseKmsKey' :{
				'location' : 'header',
				'sentAs' : 'x-amz-server-side-encryption-aws-kms-key-id'
			},
			'SseC' :{
				'location' : 'header',
				'sentAs' : 'x-amz-server-side-encryption-customer-algorithm'
			},
			'SseCKey' :{
				'location' : 'header',
				'sentAs' : 'x-amz-server-side-encryption-customer-key',
				'type' : 'password',
			},
			'Body' : {
				'location' : 'body',
			},
			'SourceFile' : {
				'type' : 'srcFile',
			}
		},
	},
	'PutObjectOutput' : {
		'parameters' : {
			'RequestId' : {
				'location' : 'header',
				'sentAs' : 'x-amz-request-id',
			},
			'ETag' : {
				'location' : 'header',
				'sentAs' : 'etag',
			},
			'VersionId' : {
				'location' : 'header',
				'sentAs' : 'x-amz-version-id',
			},
			'StorageClass' :{
				'location' : 'header',
				'sentAs' : 'x-amz-storage-class'
			},
			'SseKms' :{
				'location' : 'header',
				'sentAs' : 'x-amz-server-side-encryption'
			},
			'SseKmsKey' :{
				'location' : 'header',
				'sentAs' : 'x-amz-server-side-encryption-aws-kms-key-id'
			},
			'SseC' :{
				'location' : 'header',
				'sentAs' : 'x-amz-server-side-encryption-customer-algorithm'
			},
			'SseCKeyMd5' :{
				'location' : 'header',
				'sentAs' : 'x-amz-server-side-encryption-customer-key-MD5'
			}
		},
	},
	'GetObject' : {
		'httpMethod' : 'GET',
		'parameters' : {
			'Bucket' : {
				'required' : true,
				'location' : 'uri',
			},
			'Key' : {
				'required' : true,
				'location' : 'uri',
			},
			'ResponseCacheControl' : {
				'location' : 'urlPath',
				'sentAs' : 'response-cache-control',
			},
			'ResponseContentDisposition' : {
				'location' : 'urlPath',
				'sentAs' : 'response-content-disposition',
			},
			'ResponseContentEncoding' : {
				'location' : 'urlPath',
				'sentAs' : 'response-content-encoding',
			},
			'ResponseContentLanguage' : {
				'location' : 'urlPath',
				'sentAs' : 'response-content-language',
			},
			'ResponseContentType' : {
				'location' : 'urlPath',
				'sentAs' : 'response-content-type',
			},
			'ResponseExpires' : {
				'location' : 'urlPath',
				'sentAs' : 'response-expires',
			},
			'VersionId' : {
				'location' : 'urlPath',
				'sentAs' : 'versionId',
			},
			'ImageProcess' : {
				'location' : 'urlPath',
				'sentAs' : 'x-image-process',
			},
			'IfMatch' : {
				'location' : 'header',
				'sentAs' : 'If-Match',
			},
			'IfModifiedSince' : {
				'location' : 'header',
				'sentAs' : 'If-Modified-Since',
			},
			'IfNoneMatch' : {
				'location' : 'header',
				'sentAs' : 'If-None-Match',
			},
			'IfUnmodifiedSince' : {
				'location' : 'header',
				'sentAs' : 'If-Unmodified-Since',
			},
			'Range' : {
				'location' : 'header',
				'sentAs' : 'Range',
			},
			'Origin' :{
				'location' : 'header',
				'sentAs' : 'Origin'
			},
			'RequestHeader' : {
				'location' : 'header',
				'sentAs' : 'Access-Control-Request-Headers'
			},
			'SaveAsFile' : {
				'type' : 'dstFile',
			},
			'SaveAsStream' : {
				'type' : 'plain'
			},
			'SseC' :{
				'location' : 'header',
				'sentAs' : 'x-amz-server-side-encryption-customer-algorithm'
			},
			'SseCKey' :{
				'location' : 'header',
				'sentAs' : 'x-amz-server-side-encryption-customer-key',
				'type' : 'password'
			}
		}
	},
	'GetObjectOutput' : {
		'data' : {
			'type' : 'body'
		},
		'parameters' : {
			'Content' : {
				'location' : 'body',
			},
			'RequestId' : {
				'location' : 'header',
				'sentAs' : 'x-amz-request-id',
			},
			'Expiration' : {
				'location' : 'header',
				'sentAs' : 'x-amz-expiration',
			},
			'ETag' : {
				'location' : 'header',
				'sentAs' : 'etag',
			},
			'CacheControl' : {
				'location' : 'header',
				'sentAs' : 'cache-control',
			},
			'ContentDisposition' : {
				'location' : 'header',
				'sentAs' : 'content-disposition',
			},
			'ContentEncoding' : {
				'location' : 'header',
				'sentAs' : 'content-encoding',
			},
			'ContentLanguage' : {
				'location' : 'header',
				'sentAs' : 'content-language',
			},
			'ContentType' : {
				'location' : 'header',
				'sentAs' : 'content-type',
			},
			'Expires' : {
				'location' : 'header',
				'sentAs' : 'expires',
			},
			'VersionId' : {
				'location' : 'header',
				'sentAs' : 'x-amz-version-id',
			},
			'ContentLength' : {
				'location' : 'header',
				'sentAs' : 'content-length',
			},
			'DeleteMarker' : {
				'location' : 'header',
				'sentAs' : 'x-amz-delete-marker',
			},
			'LastModified' : {
				'type' : 'date',
				'location' : 'header',
				'sentAs' : 'last-modified',
			},
			'WebsiteRedirectLocation' : {
				'location' : 'header',
				'sentAs' : 'x-amz-website-redirect-location',
			},
			'StorageClass' : {
				'location' : 'header',
				'sentAs' : 'x-amz-storage-class'
			},
			'Restore' : {
				'location' : 'header',
				'sentAs' : 'x-amz-restore'
			},
			'AllowOrigin' : {
				'location' : 'header',
				'sentAs' : 'access-control-allow-origin'
			},
			'MaxAgeSeconds' : {
				'location' : 'header',
				'sentAs' : 'access-control-max-age'
			},
			'ExposeHeader' : {
				'location' : 'header',
				'sentAs' : 'access-control-expose-headers'
			},
			'AllowMethod' : {
				'location' : 'header',
				'sentAs' : 'access-control-allow-methods'
			},
			'AllowHeader' : {
				'location' : 'header',
				'sentAs' : 'access-control-allow-headers'
			},
			'SseKms' :{
				'location' : 'header',
				'sentAs' : 'x-amz-server-side-encryption'
			},
			'SseKmsKey' :{
				'location' : 'header',
				'sentAs' : 'x-amz-server-side-encryption-aws-kms-key-id'
			},
			'SseC' :{
				'location' : 'header',
				'sentAs' : 'x-amz-server-side-encryption-customer-algorithm'
			},
			'SseCKeyMd5' :{
				'location' : 'header',
				'sentAs' : 'x-amz-server-side-encryption-customer-key-MD5'
			},
			'Metadata' : {
				'location' : 'header',
				'type' : 'object',
				'sentAs' : 'x-amz-meta-'
			}
		},
	},
	'CopyObject' : {
		'httpMethod' : 'PUT',
		'parameters' : {
			'Bucket' : {
				'required' : true,
				'location' : 'uri',
			},
			'Key' : {
				'required' : true,
				'location' : 'uri',
			},
			'ACL' : {
				'location' : 'header',
				'sentAs' : 'x-amz-acl',
			},
			'StorageClass' : {
				'location' : 'header',
				'sentAs' : 'x-amz-storage-class',
			},
			'CopySource' : {
				'required' : true,
				'location' : 'header',
				'sentAs' : 'x-amz-copy-source',
			},
			'CopySourceIfMatch' : {
				'location' : 'header',
				'sentAs' : 'x-amz-copy-source-if-match',
			},
			'CopySourceIfModifiedSince' : {
				'location' : 'header',
				'sentAs' : 'x-amz-copy-source-if-modified-since',
			},
			'CopySourceIfNoneMatch' : {
				'location' : 'header',
				'sentAs' : 'x-amz-copy-source-if-none-match',
			},
			'CopySourceIfUnmodifiedSince' : {
				'location' : 'header',
				'sentAs' : 'x-amz-copy-source-if-unmodified-since',
			},
			'ContentType' : {
				'location' : 'header',
				'sentAs' : 'content-type'
			},
			'ContentEncoding' : {
				'location' : 'header',
				'sentAs' : 'content-encoding'
			},
			'ContentLanguage' : {
				'location' : 'header',
				'sentAs' : 'content-language'
			},
			'ContentDisposition' : {
				'location' : 'header',
				'sentAs' : 'content-disposition'
			},
			'CacheControl' : {
				'location' : 'header',
				'sentAs' : 'cache-control'
			},
			'Expires' : {
				'location' : 'header',
				'sentAs' : 'expires'
			},
			'Metadata' : {
				'type' : 'object',
				'location' : 'header',
				'sentAs' : 'x-amz-meta-',
			},
			'MetadataDirective' : {
				'location' : 'header',
				'sentAs' : 'x-amz-metadata-directive',
			},
			'WebsiteRedirectLocation' : {
				'location' : 'header',
				'sentAs' : 'x-amz-website-redirect-location',
			},
			'SseKms' :{
				'location' : 'header',
				'sentAs' : 'x-amz-server-side-encryption'
			},
			'SseKmsKey' :{
				'location' : 'header',
				'sentAs' : 'x-amz-server-side-encryption-aws-kms-key-id'
			},
			'SseC' :{
				'location' : 'header',
				'sentAs' : 'x-amz-server-side-encryption-customer-algorithm'
			},
			'SseCKey' :{
				'location' : 'header',
				'sentAs' : 'x-amz-server-side-encryption-customer-key',
				'type' : 'password'
			},
			'CopySourceSseC' :{
				'location' : 'header',
				'sentAs' : 'x-amz-copy-source-server-side-encryption-customer-algorithm'
			},
			'CopySourceSseCKey' :{
				'location' : 'header',
				'sentAs' : 'x-amz-copy-source-server-side-encryption-customer-key',
				'type' : 'password'
			},
		},
	},
	'CopyObjectOutput' : {
		'data' : {
			'type' : 'xml',
			'xmlRoot' : 'CopyObjectResult',
		},
		'parameters' : {
			'RequestId' : {
				'location' : 'header',
				'sentAs' : 'x-amz-request-id',
			},
			'VersionId' : {
				'location' : 'header',
				'sentAs' : 'x-amz-version-id',
			},
			'CopySourceVersionId' : {
				'location' : 'header',
				'sentAs' : 'x-amz-copy-source-version-id',
			},
			'ETag' : {
				'location' : 'xml',
				'sentAs' : 'ETag',
			},
			'LastModified' : {
				'type' : 'date',
				'location' : 'xml',
				'sentAs' : 'LastModified',
			},
			'SseKms' :{
				'location' : 'header',
				'sentAs' : 'x-amz-server-side-encryption'
			},
			'SseKmsKey' :{
				'location' : 'header',
				'sentAs' : 'x-amz-server-side-encryption-aws-kms-key-id'
			},
			'SseC' :{
				'location' : 'header',
				'sentAs' : 'x-amz-server-side-encryption-customer-algorithm'
			},
			'SseCKeyMd5' :{
				'location' : 'header',
				'sentAs' : 'x-amz-server-side-encryption-customer-key-MD5'
			}
		},
	},

	'RestoreObject' : {
		'httpMethod' : 'POST',
		'urlPath' : 'restore',
		'data' : {
			'xmlRoot' : 'RestoreRequest',
			'namespace' : 'http://s3.amazonaws.com/doc/2006-03-01/',
			'md5' : true
		},
		'parameters' : {
			'Bucket' : {
				'required' : true,
				'location' : 'uri',
			},
			'Key' : {
				'required' : true,
				'location' : 'uri',
			},
			'VersionId' : {
				'location' : 'urlPath',
				'sentAs' : 'versionId',
			},
			'Days' : {
				'location' : 'xml',
				'sentAs' : 'Days'
			},
			'Tier' : {
				'wrapper' : 'GlacierJobParameters',
				'location' : 'xml',
				'sentAs' : 'Tier',
			}
		}
	},

	'RestoreObjectOutput' : {
		'parameters' : {
			'RequestId' : {
				'location' : 'header',
				'sentAs' : 'x-amz-request-id',
			},
		}
	},

	'GetObjectMetadata' : {
		'httpMethod' : 'HEAD',
		'parameters' : {
			'Bucket' : {
				'required' : true,
				'location' : 'uri',
			},
			'Key' : {
				'required' : true,
				'location' : 'uri',
			},
			'VersionId' : {
				'location' : 'urlPath',
				'sentAs' : 'versionId',
			},
			'Origin' : {
				'location' : 'header',
				'sentAs' : 'Origin'
			},
			'RequestHeader' : {
				'location' : 'header',
				'sentAs' : 'Access-Control-Request-Headers'
			},
			'SseC' :{
				'location' : 'header',
				'sentAs' : 'x-amz-server-side-encryption-customer-algorithm'
			},
			'SseCKey' :{
				'location' : 'header',
				'sentAs' : 'x-amz-server-side-encryption-customer-key',
				'type' : 'password'
			},
		},
	},
	'GetObjectMetadataOutput' : {
		'parameters' : {
			'RequestId' : {
				'location' : 'header',
				'sentAs' : 'x-amz-request-id',
			},
			'Expiration' : {
				'location' : 'header',
				'sentAs' : 'x-amz-expiration',
			},
			'LastModified' : {
				'type' : 'date',
				'location' : 'header',
				'sentAs' : 'last-modified',
			},
			'ContentLength' : {
				'location' : 'header',
				'sentAs' : 'content-length',
			},
			'ContentType' :{
				'location' : 'header',
				'sentAs' : 'content-type'
			},
			'ETag' : {
				'location' : 'header',
				'sentAs' : 'etag',
			},
			'VersionId' : {
				'location' : 'header',
				'sentAs' : 'x-amz-version-id',
			},
			'WebsiteRedirectLocation' : {
				'location' : 'header',
				'sentAs' : 'x-amz-website-redirect-location',
			},
			'StorageClass' : {
				'location' : 'header',
				'sentAs' : 'x-amz-storage-class'
			},
			'Restore' : {
				'location' : 'header',
				'sentAs' : 'x-amz-restore'
			},
			'AllowOrigin' : {
				'location' : 'header',
				'sentAs' : 'access-control-allow-origin'
			},
			'MaxAgeSeconds' : {
				'location' : 'header',
				'sentAs' : 'access-control-max-age'
			},
			'ExposeHeader' : {
				'location' : 'header',
				'sentAs' : 'access-control-expose-headers'
			},
			'AllowMethod' : {
				'location' : 'header',
				'sentAs' : 'access-control-allow-methods'
			},
			'AllowHeader' : {
				'location' : 'header',
				'sentAs' : 'access-control-allow-headers'
			},
			'SseKms' :{
				'location' : 'header',
				'sentAs' : 'x-amz-server-side-encryption'
			},
			'SseKmsKey' :{
				'location' : 'header',
				'sentAs' : 'x-amz-server-side-encryption-aws-kms-key-id'
			},
			'SseC' :{
				'location' : 'header',
				'sentAs' : 'x-amz-server-side-encryption-customer-algorithm'
			},
			'SseCKeyMd5' :{
				'location' : 'header',
				'sentAs' : 'x-amz-server-side-encryption-customer-key-MD5'
			},
			'Metadata' : {
				'location' : 'header',
				'type' : 'object',
				'sentAs' : 'x-amz-meta-'
			}
		},
	},

	'SetObjectAcl' : {
		'httpMethod' : 'PUT',
		'urlPath' : 'acl',
		'data' : {
			'xmlRoot' : 'AccessControlPolicy',
			'namespace' : 'http://s3.amazonaws.com/doc/2006-03-01/',
		},
		'parameters' : {
			'Bucket' : {
				'required' : true,
				'location' : 'uri',
			},
			'Key' : {
				'required' : true,
				'location' : 'uri',
			},
			'VersionId' : {
				'location' : 'urlPath',
				'sentAs' : 'versionId',
			},
			'ACL' : {
				'location' : 'header',
				'sentAs' : 'x-amz-acl',
			},
			'Owner' : owner,
			'Grants' : grants
		},
	},
	'SetObjectAclOutput' : {
		'parameters' : {
			'RequestId' : {
				'location' : 'header',
				'sentAs' : 'x-amz-request-id',
			},
			'VersionId' : {
				'location' : 'header',
				'sentAs' : 'x-amz-version-id',
			},
		},
	},
	'GetObjectAcl' : {
		'httpMethod' : 'GET',
		'urlPath' : 'acl',
		'parameters' : {
			'Bucket' : {
				'required' : true,
				'location' : 'uri',
			},
			'Key' : {
				'required' : true,
				'location' : 'uri',
			},
			'VersionId' : {
				'location' : 'urlPath',
				'sentAs' : 'versionId',
			},
		},
	},
	'GetObjectAclOutput' : {
		'data' : {
			'type' : 'xml',
			'xmlRoot' : 'AccessControlPolicy',
		},
		'parameters' : {
			'RequestId' : {
				'location' : 'header',
				'sentAs' : 'x-amz-request-id',
			},
			'VersionId' : {
				'location' : 'header',
				'sentAs' : 'x-amz-version-id',
			},
			'Owner' : owner,
			'Grants' : grants
		},
	},
	'DeleteObject' : {
		'httpMethod' : 'DELETE',
		'parameters' : {
			'Bucket' : {
				'required' : true,
				'location' : 'uri',
			},
			'Key' : {
				'required' : true,
				'location' : 'uri',
			},
			'VersionId' : {
				'location' : 'urlPath',
				'sentAs' : 'versionId',
			},
		},
	},
	'DeleteObjectOutput' : {
		'parameters' : {
			'RequestId' : {
				'location' : 'header',
				'sentAs' : 'x-amz-request-id',
			},
			'VersionId' : {
				'location' : 'header',
				'sentAs' : 'x-amz-version-id',
			},
			'DeleteMarker' : {
				'location' : 'header',
				'sentAs' : 'x-amz-delete-marker',
			},
		},
	},
	'DeleteObjects' : {
		'httpMethod' : 'POST',
		'urlPath' : 'delete',
		'data' : {
			'xmlRoot' : 'Delete',
			'namespace' : 'http://s3.amazonaws.com/doc/2006-03-01/',
			'md5' : true
		},
		'parameters' : {
			'Bucket' : {
				'required' : true,
				'location' : 'uri',
			},
			'Quiet' : {
				'location' : 'xml',
				'sentAs' : 'Quiet',
			},
			'Objects' : {
				'required' : true,
				'type' : 'array',
				'location' : 'xml',
				'sentAs' : 'Object',
				'items' : {
					'type' : 'object',
					'parameters' : {
						'Key' : {
							'sentAs' : 'Key',
						},
						'VersionId' : {
							'sentAs' : 'VersionId',
						},
					},
				},
			},
		},
	},
	'DeleteObjectsOutput' : {
		'data' : {
			'type' : 'xml',
			'xmlRoot' : 'DeleteResult',
		},
		'parameters' : {
			'RequestId' : {
				'location' : 'header',
				'sentAs' : 'x-amz-request-id',
			},
			'Deleteds' : {
				'type' : 'array',
				'location' : 'xml',
				'sentAs' : 'Deleted',
				'items' : {
					'type' : 'object',
					'parameters' : {
						'Key' : {
							'sentAs' : 'Key',
						},
						'VersionId' : {
							'sentAs' : 'VersionId',
						},
						'DeleteMarker' : {
							'sentAs' : 'DeleteMarker',
						},
						'DeleteMarkerVersionId' : {
							'sentAs' : 'DeleteMarkerVersionId',
						},
					}
				},
			},
			'Errors' : {
				'type' : 'array',
				'location' : 'xml',
				'sentAs' : 'Error',
				'items' : {
					'type' : 'object',
					'parameters' : {
						'Key' : {
							'sentAs' : 'Key',
						},
						'VersionId' : {
							'sentAs' : 'VersionId',
						},
						'Code' : {
							'sentAs' : 'Code',
						},
						'Message' : {
							'sentAs' : 'Message',
						},
					}
				},
			},
		},
	},
	'InitiateMultipartUpload' : {
		'httpMethod' : 'POST',
		'urlPath' : 'uploads',
		'parameters' : {
			'Bucket' : {
				'required' : true,
				'location' : 'uri',
			},
			'Key' : {
				'required' : true,
				'location' : 'uri',
			},
			'ACL' : {
				'location' : 'header',
				'sentAs' : 'x-amz-acl',
			},
			'StorageClass' : {
				'location' : 'header',
				'sentAs' : 'x-amz-storage-class',
			},
			'Metadata' : {
				'type' : 'object',
				'location' : 'header',
				'sentAs' : 'x-amz-meta-',
			},
			'WebsiteRedirectLocation' : {
				'location' : 'header',
				'sentAs' : 'x-amz-website-redirect-location',
			},
			'ContentType' : {
				'location' : 'header',
				'sentAs' : 'content-type'
			},
			'SseKms' :{
				'location' : 'header',
				'sentAs' : 'x-amz-server-side-encryption'
			},
			'SseKmsKey' :{
				'location' : 'header',
				'sentAs' : 'x-amz-server-side-encryption-aws-kms-key-id'
			},
			'SseC' :{
				'location' : 'header',
				'sentAs' : 'x-amz-server-side-encryption-customer-algorithm'
			},
			'SseCKey' :{
				'location' : 'header',
				'sentAs' : 'x-amz-server-side-encryption-customer-key',
				'type' : 'password'
			},
		},
	},
	'InitiateMultipartUploadOutput' : {
		'data' : {
			'type' : 'xml',
			'xmlRoot' : 'InitiateMultipartUploadResult',
		},
		'parameters' : {
			'RequestId' : {
				'location' : 'header',
				'sentAs' : 'x-amz-request-id',
			},
			'Bucket' : {
				'location' : 'xml',
				'sentAs' : 'Bucket',
			},
			'Key' : {
				'location' : 'xml',
				'sentAs' : 'Key',
			},
			'UploadId' : {
				'location' : 'xml',
				'sentAs' : 'UploadId',
			},
			'SseKms' :{
				'location' : 'header',
				'sentAs' : 'x-amz-server-side-encryption'
			},
			'SseKmsKey' :{
				'location' : 'header',
				'sentAs' : 'x-amz-server-side-encryption-aws-kms-key-id'
			},
			'SseC' :{
				'location' : 'header',
				'sentAs' : 'x-amz-server-side-encryption-customer-algorithm'
			},
			'SseCKeyMd5' :{
				'location' : 'header',
				'sentAs' : 'x-amz-server-side-encryption-customer-key-MD5'
			}
		},
	},
	'ListMultipartUploads' : {
		'httpMethod' : 'GET',
		'urlPath' : 'uploads',
		'parameters' : {
			'Bucket' : {
				'required' : true,
				'location' : 'uri',
			},
			'Delimiter' : {
				'location' : 'urlPath',
				'sentAs' : 'delimiter',
			},
			'KeyMarker' : {
				'location' : 'urlPath',
				'sentAs' : 'key-marker',
			},
			'MaxUploads' : {
				'type' : 'number',
				'location' : 'urlPath',
				'sentAs' : 'max-uploads',
			},
			'Prefix' : {
				'location' : 'urlPath',
				'sentAs' : 'prefix',
			},
			'UploadIdMarker' : {
				'location' : 'urlPath',
				'sentAs' : 'upload-id-marker',
			},
		},
	},
	'ListMultipartUploadsOutput' : {
		'data' : {
			'type' : 'xml',
			'xmlRoot' : 'ListMultipartUploadsResult',
		},
		'parameters' : {
			'RequestId' : {
				'location' : 'header',
				'sentAs' : 'x-amz-request-id',
			},
			'Bucket' : {
				'location' : 'xml',
				'sentAs' : 'Bucket',
			},
			'KeyMarker' : {
				'location' : 'xml',
				'sentAs' : 'KeyMarker',
			},
			'UploadIdMarker' : {
				'location' : 'xml',
				'sentAs' : 'UploadIdMarker',
			},
			'NextKeyMarker' : {
				'location' : 'xml',
				'sentAs' : 'NextKeyMarker',
			},
			'Prefix' : {
				'location' : 'xml',
				'sentAs' : 'Prefix',
			},
			'Delimiter' : {
				'location' : 'xml',
				'sentAs' : 'Delimiter',
			},
			'NextUploadIdMarker' : {
				'location' : 'xml',
				'sentAs' : 'NextUploadIdMarker',
			},
			'MaxUploads' : {
				'location' : 'xml',
				'sentAs' : 'MaxUploads',
			},
			'IsTruncated' : {
				'location' : 'xml',
				'sentAs' : 'IsTruncated',
			},
			'Uploads' : {
				'type' : 'array',
				'location' : 'xml',
				'sentAs' : 'Upload',
				'items' : {
					'type' : 'object',
					'parameters' : {
						'UploadId' : {
							'sentAs' : 'UploadId',
						},
						'Key' : {
							'sentAs' : 'Key',
						},
						'Initiated' : {
							'sentAs' : 'Initiated',
						},
						'StorageClass' : {
							'sentAs' : 'StorageClass',
						},
						'Owner' : owner,
						'Initiator' : initiator
					},
				},
			},
			'CommonPrefixes' : commonPrefixes
		},
	},
	'UploadPart' : {
		'httpMethod' : 'PUT',
		'parameters' : {
			'Bucket' : {
				'required' : true,
				'location' : 'uri',
			},
			'Key' : {
				'required' : true,
				'location' : 'uri',
			},
			'PartNumber' : {
				'required' : true,
				'type' : 'number',
				'location' : 'urlPath',
				'sentAs' : 'partNumber',
			},
			'UploadId' : {
				'required' : true,
				'location' : 'urlPath',
				'sentAs' : 'uploadId',
			},
			'ContentMD5' : {
				'location' : 'header',
				'sentAs' : 'Content-MD5',
			},
			'Body' : {
				'location' : 'body',
			},
			'SourceFile' : {
				'type' : 'srcFile',
			},
			'Offset' : {
				'type' : 'plain'
			},
			'PartSize' : {
				'type' : 'plain'
			},
			'SseC' :{
				'location' : 'header',
				'sentAs' : 'x-amz-server-side-encryption-customer-algorithm'
			},
			'SseCKey' :{
				'location' : 'header',
				'sentAs' : 'x-amz-server-side-encryption-customer-key',
				'type' : 'password'
			}
		},
	},
	'UploadPartOutput' : {
		'parameters' : {
			'RequestId' : {
				'location' : 'header',
				'sentAs' : 'x-amz-request-id',
			},
			'ETag' : {
				'location' : 'header',
				'sentAs' : 'etag',
			},
			'SseKms' :{
				'location' : 'header',
				'sentAs' : 'x-amz-server-side-encryption'
			},
			'SseKmsKey' :{
				'location' : 'header',
				'sentAs' : 'x-amz-server-side-encryption-aws-kms-key-id'
			},
			'SseC' :{
				'location' : 'header',
				'sentAs' : 'x-amz-server-side-encryption-customer-algorithm'
			},
			'SseCKeyMd5' :{
				'location' : 'header',
				'sentAs' : 'x-amz-server-side-encryption-customer-key-MD5'
			}
		},
	},
	'ListParts' : {
		'httpMethod' : 'GET',
		'parameters' : {
			'Bucket' : {
				'required' : true,
				'location' : 'uri',
			},
			'Key' : {
				'required' : true,
				'location' : 'uri',
			},
			'UploadId' : {
				'required' : true,
				'location' : 'urlPath',
				'sentAs' : 'uploadId',
			},
			'MaxParts' : {
				'type' : 'number',
				'location' : 'urlPath',
				'sentAs' : 'max-parts',
			},
			'PartNumberMarker' : {
				'type' : 'number',
				'location' : 'urlPath',
				'sentAs' : 'part-number-marker',
			},
		},
	},
	'ListPartsOutput' : {
		'data' : {
			'type' : 'xml',
			'xmlRoot' : 'ListPartsResult',
		},
		'parameters' : {
			'RequestId' : {
				'location' : 'header',
				'sentAs' : 'x-amz-request-id',
			},
			'Bucket' : {
				'location' : 'xml',
				'sentAs' : 'Bucket',
			},
			'Key' : {
				'location' : 'xml',
				'sentAs' : 'Key',
			},
			'UploadId' : {
				'location' : 'xml',
				'sentAs' : 'UploadId',
			},
			'PartNumberMarker' : {
				'location' : 'xml',
				'sentAs' : 'PartNumberMarker',
			},
			'NextPartNumberMarker' : {
				'location' : 'xml',
				'sentAs' : 'NextPartNumberMarker',
			},
			'MaxParts' : {
				'location' : 'xml',
				'sentAs' : 'MaxParts',
			},
			'IsTruncated' : {
				'location' : 'xml',
				'sentAs' : 'IsTruncated',
			},
			'StorageClass' : {
				'location' : 'xml',
				'sentAs' : 'StorageClass',
			},
			'Initiator':initiator,
			'Owner' : owner,
			'Parts' : {
				'type' : 'array',
				'location' : 'xml',
				'sentAs' : 'Part',
				'items' : {
					'type' : 'object',
					'parameters' : {
						'PartNumber' : {
							'sentAs' : 'PartNumber',
						},
						'LastModified' : {
							'type' : 'date',
							'sentAs' : 'LastModified',
						},
						'ETag' : {
							'sentAs' : 'ETag',
						},
						'Size' : {
							'sentAs' : 'Size',
						},
					},
				},
			}
		},
	},
	'CopyPart' : {
		'httpMethod' : 'PUT',
		'parameters' : {
			'Bucket' : {
				'required' : true,
				'location' : 'uri',
			},
			'Key' : {
				'required' : true,
				'location' : 'uri',
			},
			'PartNumber' : {
				'required' : true,
				'location' : 'urlPath',
				'sentAs' : 'partNumber',
				'type' : 'number',
			},
			'UploadId' : {
				'required' : true,
				'location' : 'urlPath',
				'sentAs' : 'uploadId',
			},
			'CopySource' : {
				'required' : true,
				'location' : 'header',
				'sentAs' : 'x-amz-copy-source',
			},
			'CopySourceRange' : {
				'location' : 'header',
				'sentAs' : 'x-amz-copy-source-range',
			},
			'SseC' :{
				'location' : 'header',
				'sentAs' : 'x-amz-server-side-encryption-customer-algorithm'
			},
			'SseCKey' :{
				'location' : 'header',
				'sentAs' : 'x-amz-server-side-encryption-customer-key',
				'type' : 'password'
			},
			'CopySourceSseC' :{
				'location' : 'header',
				'sentAs' : 'x-amz-copy-source-server-side-encryption-customer-algorithm'
			},
			'CopySourceSseCKey' :{
				'location' : 'header',
				'sentAs' : 'x-amz-copy-source-server-side-encryption-customer-key',
				'type' : 'password'
			}
		},
	},
	'CopyPartOutput' : {
		'data' : {
			'type' : 'xml',
			'xmlRoot' : 'CopyPartResult',
		},
		'parameters' : {
			'RequestId' : {
				'location' : 'header',
				'sentAs' : 'x-amz-request-id',
			},
			'LastModified' : {
				'type' : 'date',
				'location' : 'xml',
				'sentAs' : 'LastModified',
			},
			'ETag' : {
				'location' : 'xml',
				'sentAs' : 'ETag',
			},
			'SseKms' :{
				'location' : 'header',
				'sentAs' : 'x-amz-server-side-encryption'
			},
			'SseKmsKey' :{
				'location' : 'header',
				'sentAs' : 'x-amz-server-side-encryption-aws-kms-key-id'
			},
			'SseC' :{
				'location' : 'header',
				'sentAs' : 'x-amz-server-side-encryption-customer-algorithm'
			},
			'SseCKeyMd5' :{
				'location' : 'header',
				'sentAs' : 'x-amz-server-side-encryption-customer-key-MD5'
			}
		},
	},
	'AbortMultipartUpload' : {
		'httpMethod' : 'DELETE',
		'parameters' : {
			'Bucket' : {
				'required' : true,
				'location' : 'uri',
			},
			'Key' : {
				'required' : true,
				'location' : 'uri',
			},
			'UploadId' : {
				'required' : true,
				'location' : 'urlPath',
				'sentAs' : 'uploadId',
			},
		},
	},
	'AbortMultipartUploadOutput' : {
		'parameters' : {
			'RequestId' : {
				'location' : 'header',
				'sentAs' : 'x-amz-request-id',
			},
		},
	},
	'CompleteMultipartUpload' : {
		'httpMethod' : 'POST',
		'data' : {
			'xmlRoot' : 'CompleteMultipartUpload',
			'namespace' : 'http://s3.amazonaws.com/doc/2006-03-01/',
		},
		'parameters' : {
			'Bucket' : {
				'required' : true,
				'location' : 'uri',
			},
			'Key' : {
				'required' : true,
				'location' : 'uri',
			},
			'UploadId' : {
				'required' : true,
				'location' : 'urlPath',
				'sentAs' : 'uploadId',
			},
			'Parts' : {
				'required' : true,
				'type' : 'array',
				'location' : 'xml',
				'sentAs' : 'Part',
				'items' : {
					'type' : 'object',
					'parameters' : {
						'PartNumber' : {
							'sentAs' : 'PartNumber',
						},
						'ETag' : {
							'sentAs' : 'ETag',
						},
					},
				},
			},
		},
	},
	'CompleteMultipartUploadOutput' : {
		'data' : {
			'type' : 'xml',
			'xmlRoot' : 'CompleteMultipartUploadResult',
		},
		'parameters' : {
			'RequestId' : {
				'location' : 'header',
				'sentAs' : 'x-amz-request-id',
			},
			'VersionId' : {
				'location' : 'header',
				'sentAs' : 'x-amz-version-id',
			},
			'Location' : {
				'location' : 'xml',
				'sentAs' : 'Location',
			},
			'Bucket' : {
				'location' : 'xml',
				'sentAs' : 'Bucket',
			},
			'Key' : {
				'location' : 'xml',
				'sentAs' : 'Key',
			},
			'ETag' : {
				'location' : 'xml',
				'sentAs' : 'ETag',
			},
			'SseKms' :{
				'location' : 'header',
				'sentAs' : 'x-amz-server-side-encryption'
			},
			'SseKmsKey' :{
				'location' : 'header',
				'sentAs' : 'x-amz-server-side-encryption-aws-kms-key-id'
			},
			'SseC' :{
				'location' : 'header',
				'sentAs' : 'x-amz-server-side-encryption-customer-algorithm'
			},
			'SseCKeyMd5' :{
				'location' : 'header',
				'sentAs' : 'x-amz-server-side-encryption-customer-key-MD5'
			}
		},
	},

	'OptionsObject' : {
		'httpMethod' : 'OPTIONS',
		'parameters' : {
			'Bucket' : {
				'required' : true,
				'location' : 'uri',
			},
			'Key' : {
				'required' : true,
				'location' : 'uri',
			},
			'Origin' : {
				'required' : true,
				'location' : 'header',
				'sentAs' : 'Origin',
			},
			'AccessControlRequestMethods' : {
				'required' : true,
				'type' : 'array',
				'location' : 'header',
				'sentAs' : 'Access-Control-Request-Method',
				'items' : {
					'type' : 'string',
				},
			},
			'AccessControlRequestHeaders' : {
				'type' : 'array',
				'location' : 'header',
				'sentAs' : 'Access-Control-Request-Headers',
				'items' : {
					'type' : 'string',
				},
			},
		},
	},
	'OptionsObjectOutput' : {
		'parameters' : {
			'RequestId' : {
				'location' : 'header',
				'sentAs' : 'x-amz-request-id',
			},
			'AllowOrigin' : {
				'location' : 'header',
				'sentAs' : 'access-control-allow-origin',
			},
			'AllowHeader' : {
				'location' : 'header',
				'sentAs' : 'access-control-allow-headers',
			},
			'AllowMethod' : {
				'location' : 'header',
				'sentAs' : 'access-control-allow-methods',
			},
			'ExposeHeader' : {
				'location' : 'header',
				'sentAs' : 'access-control-expose-headers',
			},
			'MaxAgeSeconds' : {
				'location' : 'header',
				'sentAs' : 'access-control-max-age',
			},
		},
	}
};

module.exports = operations;