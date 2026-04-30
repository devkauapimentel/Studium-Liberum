
            <li class="py-3 border-b border-gray-200 dark:border-gray-700 last:border-b-0">
              {{#if meta.breadcrumbs}}
                <p class="text-xs text-gray-500 dark:text-gray-400 mb-1">{{ meta.breadcrumbs }}</p>
              {{/if}}
              <p class="font-medium">
                <a class="text-blue-600 dark:text-blue-400 hover:underline" href="{{ meta.url | default(url) | safeUrl }}">
                  {{ meta.title }}
                </a>
              </p>
              {{#if excerpt}}
                <p class="text-gray-600 dark:text-gray-400 mt-1 text-sm">{{+ excerpt +}}</p>
              {{/if}}
              {{#if sub_results}}
                <ul class="mt-3 ml-4 flex flex-wrap gap-2">
                  {{#each sub_results as sub}}
                    {{#if (lt @index 5)}}
                      <li class="text-sm">
                        <a class="text-blue-600 dark:text-blue-400 hover:underline" href="{{ sub.url | safeUrl }}">
                          {{ sub.title }}
                        </a>
                      </li>
                    {{/if}}
                  {{/each}}
                </ul>
              {{/if}}
            </li>
          