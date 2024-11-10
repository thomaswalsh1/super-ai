<script lang="ts">
    import { resetMode, setMode } from "mode-watcher";
    import * as DropdownMenu from "$lib/components/ui/dropdown-menu";
    import { buttonVariants } from "$lib/components/ui/button";
    import Sun from "lucide-svelte/icons/sun";
    import Moon from "lucide-svelte/icons/moon";

    import Logo from "$lib/assets/logo.png?enhanced";
</script>

<header class="flex flex-row justify-between gap-4 w-full p-4 border-b-2">
    <div class="flex flex-row items-center gap-2" id="logo-section">
        <enhanced:img src={Logo} alt="Logo" class="h-8 w-8 rounded-lg" />
        <div id="name-header">
            <span class="text-2xl font-semibold" id="name-heading">SuperAI</span>
        </div>
    </div>

    <div class="justify-end">
        <DropdownMenu.Root>
            <DropdownMenu.Trigger class={buttonVariants({ variant: "outline", size: "icon" })}>
                <Sun class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span class="sr-only">Toggle theme</span>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content align="end">
                <DropdownMenu.Item onclick={() => setMode("light")}>Light</DropdownMenu.Item>
                <DropdownMenu.Item onclick={() => setMode("dark")}>Dark</DropdownMenu.Item>
                <DropdownMenu.Item onclick={() => resetMode()}>System</DropdownMenu.Item>
            </DropdownMenu.Content>
        </DropdownMenu.Root>
    </div>
</header>
