<script lang="ts">
  import CardTable, {
    type TableColumn,
  } from 'components/Cards/CardTable.svelte'
  import { MediaQuery } from 'svelte/reactivity'
  import Tearsheet from 'components/Modals/Tearsheet.svelte'
  import type { ISecurity } from 'models/security'
  import type { SvelteComponent } from 'svelte'

  let mobile = new MediaQuery('max-width: 1024px')
  let tearsheetModal: SvelteComponent | undefined = $state()

  const onRowTap = (data: ISecurity) => {
    tearsheetModal?.show(data)
  }

  const columns: TableColumn<Record<string, any>>[] = [
    {
      key: 'Date',
      header: 'Date',
      sortable: true,
      bodyClasses: 'whitespace-nowrap',
    },
    { key: 'Transaction', header: 'Description', sortable: true },
    { key: 'name', header: 'Security | Ticker', sortable: true },
    { key: 'Quantity', header: 'Quantity (Shares)', sortable: true },
    { key: 'price', header: 'Price (Etb)', sortable: true },
    { key: 'netAmount', header: 'Net Amount (Etb)', sortable: true },
  ]

  const data: ISecurity[] = []
</script>

<div class="motion-preset-fade w-full block">
  <span class="page-title my-4 flex gap-2 items-center">
    <span class="material-symbols-outlined skiptranslate thin">swap_horiz</span>
    Activity
    {#if data.length > 0}
      ({data.length})
    {/if}
  </span>
  <div class="card bg-opacity-40">
    {#if mobile.current}
      <div class="flex flex-col">
        {#if data.length === 0}
          <span class="p-6">No results found.</span>
        {/if}
        <!--        {#each data as security}-->
        <!--&lt;!&ndash;          <button&ndash;&gt;-->
        <!--&lt;!&ndash;            onclick={() => onRowTap(security)}&ndash;&gt;-->
        <!--&lt;!&ndash;            class="unset hover:bg-accent/30 dark:hover:bg-accent-dark/30"&ndash;&gt;-->
        <!--&lt;!&ndash;          >&ndash;&gt;-->
        <!--&lt;!&ndash;            <span class="flex w-full justify-between p-4">&ndash;&gt;-->
        <!--&lt;!&ndash;              <span class="flex gap-2">&ndash;&gt;-->
        <!--&lt;!&ndash;                <span class="flex flex-col">&ndash;&gt;-->
        <!--&lt;!&ndash;                  <span class="dark-light-text body-text">{security.Date}</span>&ndash;&gt;-->
        <!--&lt;!&ndash;                  <span class="dark-light-text body-text">{security.name}</span>&ndash;&gt;-->
        <!--&lt;!&ndash;                  <span>{security.}</span>&ndash;&gt;-->
        <!--&lt;!&ndash;                </span>&ndash;&gt;-->
        <!--&lt;!&ndash;              </span>&ndash;&gt;-->
        <!--&lt;!&ndash;            </span>&ndash;&gt;-->
        <!--&lt;!&ndash;          </button>&ndash;&gt;-->
        <!--        {/each}-->
      </div>
    {:else}
      <CardTable {onRowTap} {columns} {data} />
    {/if}
  </div>
</div>
<Tearsheet bind:this={tearsheetModal} />
