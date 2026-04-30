
  
  await import('/pagefind/pagefind-component-ui.js');
  const { configureInstance, getInstanceManager } = window.PagefindComponents;

  configureInstance('default', {
    bundlePath: '/pagefind/',
    ranking: {
      termFrequency: 0.0,
      termSimilarity: 2.0,
      pageLength: 0.0,
      termSaturation: 1.0,
      metaWeights: {
        title: 10.0,
        description: 4.0,
        keywords: 6.0
      }
    }
  });

  
  document.body.insertAdjacentHTML('beforeend', `
    <pagefind-modal id="search-modal" reset-on-close>
      <pagefind-modal-header>
        <pagefind-input placeholder="Search documentation…"></pagefind-input>
      </pagefind-modal-header>
      <pagefind-modal-body>
        <p id="search-placeholder" class="text-center text-gray-500 dark:text-gray-400 py-8">
          Start typing to search the documentation
        </p>
        <pagefind-summary></pagefind-summary>
        <pagefind-results>
          \x3Cscript type="text/pagefind-template">
            <li class="py-3 border-b border-gray-200 dark:border-gray-700 last:border-b-0">
              \u007b\u007b#if meta.breadcrumbs\u007d\u007d
                <p class="text-xs text-gray-500 dark:text-gray-400 mb-1">\u007b\u007b meta.breadcrumbs \u007d\u007d</p>
              \u007b\u007b\/if\u007d\u007d
              <p class="font-medium">
                <a class="text-blue-600 dark:text-blue-400 hover:underline" href="\u007b\u007b meta.url | default(url) | safeUrl \u007d\u007d">
                  \u007b\u007b meta.title \u007d\u007d
                </a>
              </p>
              \u007b\u007b#if excerpt\u007d\u007d
                <p class="text-gray-600 dark:text-gray-400 mt-1 text-sm">\u007b\u007b\u002b excerpt \u002b\u007d\u007d</p>
              \u007b\u007b\/if\u007d\u007d
              \u007b\u007b#if sub_results\u007d\u007d
                <ul class="mt-3 ml-4 flex flex-wrap gap-2">
                  \u007b\u007b#each sub_results as sub\u007d\u007d
                    \u007b\u007b#if (lt @index 5)\u007d\u007d
                      <li class="text-sm">
                        <a class="text-blue-600 dark:text-blue-400 hover:underline" href="\u007b\u007b sub.url | safeUrl \u007d\u007d">
                          \u007b\u007b sub.title \u007d\u007d
                        </a>
                      </li>
                    \u007b\u007b\/if\u007d\u007d
                  \u007b\u007b\/each\u007d\u007d
                </ul>
              \u007b\u007b\/if\u007d\u007d
            </li>
          \x3C/script>
        </pagefind-results>
      </pagefind-modal-body>
    </pagefind-modal>
  `);

  const modal = document.getElementById('search-modal');
  const placeholder = document.getElementById('search-placeholder');

  
  const instance = getInstanceManager().getInstance('default');
  instance.on('search', (term) => {
    placeholder.hidden = !!term;
  });
  instance.on('results', () => {
    placeholder.hidden = !!instance.searchTerm;
  });

  
  const openModal = () => modal.open?.();
  document.getElementById('search-modal-trigger').addEventListener('click', openModal);
  document.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      openModal();
    }
  });
