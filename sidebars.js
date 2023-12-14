const sidebars = {
  docs: [
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
        'overviews/overview-operators-private',
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
        'getting-started/gs-api-using',
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
        'portal/participant-info',
        'portal/team-members',
        'portal/email-contacts',
      ],
    },

    {
      type: 'category',
      label: 'SDKs',
      link: {
        type: 'generated-index',
      },
      collapsed: true,
      items: [
        'sdks/summary-sdks',
        'sdks/client-side-identity',
        'sdks/uid2-sdk-ref-java',
        'sdks/uid2-sdk-ref-python',
        'sdks/uid2-sdk-ref-csharp-dotnet',
        'sdks/uid2-sdk-ref-cplusplus',
        'sdks/uid2-sdk-ref-android',
        'sdks/uid2-sdk-ref-ios',
      ],
    },

    {
      type: 'category',
      label: 'Integration Guides',
      link: {
        type: 'generated-index',
      },
      collapsed: true,

      items: [
        'guides/summary-guides',

        {
          type: 'category',
          label: 'Publisher Integrations',
          link: {
            type: 'generated-index',
          },
          collapsed: true,

          items: [
          {
            type: 'category',
            label: 'Web',
            link: {
              type: 'generated-index',
            },
            collapsed: true,
            items: [
              'guides/integration-prebid',
              'guides/publisher-client-side',
              'guides/integration-prebid-client-side',
              'guides/integration-prebid-server-side',
              'guides/integration-javascript-standard',
              'guides/custom-publisher-integration',
              'guides/google-ss-integration',
                    ],
          },
          {
            type: 'category',
            label: 'Mobile',
            link: {
              type: 'generated-index',
            },
            collapsed: true,
            items: [
              'sdks/uid2-sdk-ref-android',
              'sdks/uid2-sdk-ref-ios',
            ],
          },
          {
            type: 'category',
            label: 'Prebid',
            link: {
              type: 'generated-index',
            },
            collapsed: true,
            items: [
              'guides/integration-prebid',
              'guides/integration-prebid-client-side',
              'guides/integration-prebid-server-side',
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
            'guides/snowflake_integration',
            'guides/integration-aws-entity-resolution',
          ],
        },

        'guides/dsp-guide',

        {
          type: 'category',
          label: 'Private Operator Integrations',
          link: {
            type: 'generated-index',
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

     'summary-doc-v2',
    {
      type: 'category',
      label: 'Endpoints (v2)',
      link: {
        type: 'generated-index',
      },
      collapsed: true,
      items: [
        'endpoints/summary-endpoints',
        'endpoints/post-token-generate',
        'endpoints/post-token-validate',
        'endpoints/post-token-refresh',
        'endpoints/post-identity-buckets',
        'endpoints/post-identity-map',
      ],
    },

    {
      type: 'category',
      label: 'UID2 Sharing',
      link: {
        type: 'generated-index',
      },
      collapsed: true,
      items: [
        'sharing/sharing-overview',
        'sharing/sharing-use-cases',
        'sharing/sharing-implementing',
        'sharing/sharing-best-practices',
        'sharing/sharing-bid-stream',
      ],
    },
    'ref-info/glossary-uid',
    'ref-info/updates-doc',
  ],
};
module.exports = sidebars;
