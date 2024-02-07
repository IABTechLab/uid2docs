function removeItems(sidebar, ...remove) {
  const result = [];
  for (let item of sidebar) {
    if (typeof item === 'string') 
    {
      if (!remove.includes(item)) result.push(item);
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
        type: 'doc',
        id: 'portal/portal-overview',
      },

      items: [
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
        type: 'doc',
        id: 'sdks/summary-sdks',
      },
      items: [
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
        type: 'doc',
        id: 'guides/summary-guides',
      },

      items: [

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
                  'guides/integration-prebid-server-side',
                ],
              },

              {
                type: 'category',
                label: 'JavaScript',
                link: {
                  type: 'generated-index',
                },
                collapsed: true,
                items: [
                  'guides/publisher-client-side',
                  'guides/integration-javascript-server-side',
                ],
              },
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
              type: 'doc',
              id: 'guides/integration-prebid',
            },
            collapsed: true,
            items: [
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

    {
      type: 'category',
      label: 'Endpoints (v2)',
      link: {
        type: 'doc',
        id: 'endpoints/summary-endpoints',
      },
      items: [
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
        type: 'doc',
        id: 'sharing/sharing-overview',
      },
      items: [
        'sharing/sharing-use-cases',
        'sharing/sharing-implementing',
        'sharing/sharing-best-practices',
        'sharing/sharing-bid-stream',
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
    'overviews/overview-operators-private',
    'guides/advertiser-dataprovider-guide',
    'guides/snowflake_integration',
    'guides/integration-aws-entity-resolution',
    'guides/dsp-guide'
  ),


  sidebarAdvertisers: removeItems(fullSidebar, 
    'overviews/overview-publishers',
    'overviews/overview-dsps',
    'overviews/overview-data-providers',
    'overviews/overview-operators-private',
    'guides/dsp-guide'
  ),

  sidebarDSPs: removeItems(fullSidebar, 
    'overviews/overview-publishers',
    'overviews/overview-advertisers',
    'overviews/overview-data-providers',
    'overviews/overview-operators-private',
    'guides/advertiser-dataprovider-guide',
    'guides/snowflake_integration',
    'guides/integration-aws-entity-resolution',
  ),

  sidebarDataProviders: removeItems(fullSidebar, 
    'overviews/overview-publishers',
    'overviews/overview-advertisers',
    'overviews/overview-dsps',
    'overviews/overview-operators-private',
    'guides/dsp-guide'
  ),

};
module.exports = sidebars;
