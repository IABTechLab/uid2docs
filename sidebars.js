function removeItems(sidebar, ...remove) {
  const result = [];
  for (let item of sidebar) {
    if (typeof item === 'string')
    {
      if (!remove.includes(item)) result.push({
        type: 'ref', id: item
      });
    }
    else {
      if (!remove.includes(item.label)) {
        const {items, ...rest} = item;
        const keepItems = removeItems(items, ...remove);
        if (keepItems?.length > 0) result.push({...rest, items: keepItems});
      }
    }
  }
  return result;
}

const fullSidebar = [
    {
      type: 'category',
      label: 'UID2 Overview',
      link: {
        type: 'doc',
        id: 'intro',
      },
      items: [
        'overviews/overview-publishers',
        'overviews/overview-advertisers',
        'overviews/overview-dsps',
        'overviews/overview-data-providers',
      ],
    },

    {
      type: 'category',
      label: 'Getting Started',
      link: {
        type: 'generated-index',
      },
      collapsed: true,
      items: [
        'getting-started/gs-account-setup',
        'getting-started/gs-credentials',
        'getting-started/gs-permissions',
        'getting-started/gs-auth',
        'getting-started/gs-environments',
        'getting-started/gs-encryption-decryption',
        'getting-started/gs-normalization-encoding',
        'getting-started/gs-opt-out',
        'getting-started/gs-faqs',
        'getting-started/gs-sharing',
      ],
    },

    {
      type: 'category',
      label: 'UID2 Portal',
      link: {
        type: 'generated-index',
      },
      collapsed: true,
      items: [
        'portal/portal-overview',
        'portal/portal-getting-started',
        'portal/sharing-permissions',
        'portal/api-keys',
        'portal/client-side-integration',
        'portal/participant-info',
        'portal/team-members',
        'portal/email-contacts',
      ],
    },

    {
      type: 'category',
      label: 'Integration Guides',
      link: {
        type: 'doc',
        id: 'guides/summary-guides',
      },
      collapsed: false,

      items: [
        {
          type: 'category',
          label: 'Publisher Integrations',
          link: {
            type: 'generated-index',
          },
          collapsed: false,

          items: [
          {
            type: 'category',
            label: 'Web',
            link: {
              type: 'doc',
              id: 'guides/integration-options-publisher-web',
            },
            collapsed: true,
            items: [
              {
                type: 'category',
                label: 'Prebid',
                link: {
                  type: 'doc',
                  id: 'guides/integration-prebid',
                },
                collapsed: true,
                items: [
                  'guides/integration-prebid-client-side',
                  'guides/integration-prebid-client-server',
                ],
              },

              {
                type: 'category',
                label: 'JavaScript',
                link: {
                  type: 'doc',
                  id: 'guides/integration-javascript',
                },
                collapsed: true,
                items: [
                  'guides/integration-javascript-client-side',
                  'guides/integration-javascript-client-server',
                ],
              },
              'guides/integration-publisher-server-side',
              'guides/google-ss-integration',
            ],
          },

          {
            type: 'category',
            label: 'Mobile',
            link: {
              type: 'doc',
              id: 'guides/integration-mobile-overview',
            },
            collapsed: true,
            items: [
              'guides/integration-mobile-client-side',
              'guides/integration-mobile-client-server',
            ],
          },

          'guides/integration-ctv-guide',

          {
            type: 'category',
            label: 'Prebid',
            link: {
              type: 'doc',
              id: 'guides/integration-prebid',
            },
            collapsed: true,
            items: [
              'guides/integration-prebid-client-side',
              'guides/integration-prebid-client-server',
              'guides/integration-prebid-mobile-summary',
            ],
          },

          {
            type: 'category',
            label: 'Google Ad Manager',
            link: {
              type: 'generated-index',
            },
            collapsed: true,
            items: [
              'guides/google-ss-integration',
              'guides/mobile-plugin-gma-android',
              'guides/mobile-plugin-gma-ios',
              'guides/mobile-plugin-ima-android',
              'guides/mobile-plugin-ima-ios',
            ],
          },
          ],
        },

        {
          type: 'category',
          label: 'Advertiser/Data Provider Integrations',
          link: {
            type: 'generated-index',
          },
          collapsed: true,
          items: [
            'guides/advertiser-dataprovider-guide',
            'guides/integration-javascript-client-side',
            'guides/snowflake_integration',
            'guides/integration-aws-entity-resolution',
          ],
        },

        {
          type: 'category',
          label: 'DSP Integrations',
          link: {
            type: 'generated-index',
          },
          collapsed: true,
          items: [
            'guides/dsp-guide',
            'guides/integration-dsp-no-sdk',
          ],
        },

        {
          type: 'category',
          label: 'Private Operator Integrations',
          link: {
            type: 'doc',
            id: 'guides/integration-options-private-operator',
          },
          collapsed: true,
          items: [
            'guides/operator-guide-aws-marketplace',
            'guides/operator-private-gcp-confidential-space',
            'guides/operator-guide-azure-enclave',
          ],
        },
      ],
    },

    {
      type: 'category',
      label: 'SDKs',
      link: {
        type: 'doc',
        id: 'sdks/summary-sdks',
      },
      collapsed: true,
      items: [
        'sdks/sdk-ref-javascript',
        'sdks/sdk-ref-java',
        'sdks/sdk-ref-python',
        'sdks/sdk-ref-csharp-dotnet',
        'sdks/sdk-ref-cplusplus',
        'sdks/sdk-ref-android',
        'sdks/sdk-ref-ios',
      ],
    },

    {
      type: 'category',
      label: 'Endpoints (v2)',
      link: {
        type: 'doc',
        id: 'endpoints/summary-endpoints',
      },
      collapsed: false,
      items: [
        'endpoints/post-token-generate',
        'endpoints/post-token-validate',
        'endpoints/post-token-refresh',
        'endpoints/post-identity-buckets',
        'endpoints/post-identity-map',
        'endpoints/post-optout-status',
      ],
    },

    {
      type: 'category',
      label: 'UID2 Sharing',
      link: {
        type: 'generated-index',
      },
      collapsed: false,
      items: [
        'sharing/sharing-overview',
        'sharing/sharing-security',
        'sharing/sharing-use-cases',
        {
          type: 'category',
          label: 'Tokenized Sharing',
          link: {
            type: 'generated-index',
          },
          collapsed: false,
          items: [
            'sharing/sharing-tokenized-overview',
            'sharing/sharing-tokenized-from-data-bid-stream',
            'sharing/sharing-tokenized-from-data-pixel',
            'sharing/sharing-tokenized-from-raw',
          ],
        },
        'sharing/sharing-raw',
        'sharing/sharing-best-practices',
      ],
    },

    {
      type: 'category',
      label: 'Reference Information',
      link: {
        type: 'generated-index',
      },
      collapsed: true,
      items: [
        'ref-info/ref-operators-public-private',
        'ref-info/ref-server-side-token-generation',
        'ref-info/ref-integration-approaches',
        'summary-doc-v2',
      ],
    },

    'ref-info/glossary-uid',
    'ref-info/updates-doc',
  ];


const sidebars = {
  docs: fullSidebar,

  sidebarPublishers: removeItems(fullSidebar, 
    'overviews/overview-advertisers',
    'overviews/overview-dsps',
    'overviews/overview-data-providers',
    'Advertiser/Data Provider Integrations',
    'guides/advertiser-dataprovider-guide',
    'guides/snowflake_integration',
    'guides/integration-aws-entity-resolution',
    'guides/dsp-guide',
    'endpoints/post-identity-buckets',
    'endpoints/post-identity-map',
    'endpoints/post-optout-status'
  ),

  sidebarAdvertisers: removeItems(fullSidebar, 
    'overviews/overview-publishers',
    'overviews/overview-dsps',
    'overviews/overview-data-providers',
    'Publisher Integrations',
    'Web',
    'guides/integration-options-publisher-web',
    'Prebid',
    'guides/integration-prebid',
    'guides/integration-prebid-client-side',
    'guides/integration-prebid-client-server',
    'JavaScript',
    'guides/integration-javascript',
    'guides/integration-javascript-client-server',
    'Server-Only',
    'guides/integration-publisher-server-side',
    'GAM Secure Signals',
    'guides/google-ss-integration',
    'Mobile',
    'guides/sdk-ref-android',
    'guides/sdk-ref-ios',
    'Prebid',
    'guides/integration-prebid',
    'guides/integration-prebid-client-side',
    'guides/integration-prebid-client-server',
    'Google Ad Manager',
    'guides/google-ss-integration',
    'guides/mobile-plugin-gma-android',
    'guides/mobile-plugin-gma-ios',
    'guides/mobile-plugin-ima-android',
    'guides/mobile-plugin-ima-ios',
    'guides/dsp-guide',
    'endpoints/post-token-generate',
    'endpoints/post-token-validate',
    'endpoints/post-token-refresh',
    'sharing/sharing-bid-stream'
    ),

  sidebarDSPs: removeItems(fullSidebar, 
    'overviews/overview-publishers',
    'overviews/overview-advertisers',
    'overviews/overview-data-providers',
    'Publisher Integrations',
    'Web',
    'guides/integration-options-publisher-web',
    'Prebid',
    'guides/integration-prebid',
    'guides/integration-prebid-client-side',
    'guides/integration-prebid-client-server',
    'JavaScript',
    'guides/integration-javascript',
    'guides/integration-javascript-client-side',
    'guides/integration-javascript-client-server',
    'Server-Only',
    'guides/integration-publisher-server-side',
    'GAM Secure Signals',
    'guides/google-ss-integration',
    'Mobile',
    'guides/sdk-ref-android',
    'guides/sdk-ref-ios',
    'Prebid',
    'guides/integration-prebid',
    'guides/integration-prebid-client-side',
    'guides/integration-prebid-client-server',
    'Google Ad Manager',
    'guides/google-ss-integration',
    'guides/mobile-plugin-gma-android',
    'guides/mobile-plugin-gma-ios',
    'guides/mobile-plugin-ima-android',
    'guides/mobile-plugin-ima-ios',
    'guides/advertiser-dataprovider-guide',
    'guides/snowflake_integration',
    'guides/integration-aws-entity-resolution',
    'sharing/sharing-bid-stream'
    ),

  sidebarDataProviders: removeItems(fullSidebar, 
    'overviews/overview-publishers',
    'overviews/overview-advertisers',
    'overviews/overview-dsps',
    'Publisher Integrations',
    'Web',
    'guides/integration-options-publisher-web',
    'Prebid',
    'guides/integration-prebid',
    'guides/integration-prebid-client-side',
    'guides/integration-prebid-client-server',
    'JavaScript',
    'guides/integration-javascript',
    'guides/integration-javascript-client-server',
    'Server-Only',
    'guides/integration-publisher-server-side',
    'GAM Secure Signals',
    'guides/google-ss-integration',
    'Mobile',
    'guides/sdk-ref-android',
    'guides/sdk-ref-ios',
    'Prebid',
    'guides/integration-prebid',
    'guides/integration-prebid-client-side',
    'guides/integration-prebid-client-server',
    'Google Ad Manager',
    'guides/google-ss-integration',
    'guides/mobile-plugin-gma-android',
    'guides/mobile-plugin-gma-ios',
    'guides/mobile-plugin-ima-android',
    'guides/mobile-plugin-ima-ios',
    'guides/dsp-guide',  
    'endpoints/post-token-generate',
    'endpoints/post-token-validate',
    'endpoints/post-token-refresh',
    'sharing/sharing-bid-stream'
  ),

};
module.exports = sidebars;
