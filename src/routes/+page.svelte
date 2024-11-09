<script lang="ts">
    import { Input } from "$lib/components/ui/input";
    import { Button } from "$lib/components/ui/button";
</script>

<div class="flex flex-row h-[42rem]" id="bottom-container">
    <div class="basis-1/2 border p-6 flex items-center" id="prompt-half">
        <div id="prompt box" class="flex basis-5/6 gap-4">
            <Input type="text" placeholder="chat" class="max-w-xs" />
            <Button type="submit">Send</Button>
        </div>
    </div>
    <div class="basis-1/2 border p-6" id="output-half">
        output
    </div>
</div>
