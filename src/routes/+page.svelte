<script lang="ts">
    import { Input } from "$lib/components/ui/input";
</script>

<div class="flex flex-row min-h-svh" id="bottom-container">
    <div class="basis-1/2 border p-6 flex items-end" id="prompt-half">
        <div id="prompt box">
            <Input type="text" placeholder="chat" class="max-w-xs" />
        </div>
    </div>
    <div class="basis-1/2 border p-6" id="output-half">
        output
    </div>
</div>
