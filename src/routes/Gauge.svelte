<script lang="ts">
    interface Props {
        value: number;
        max: number;
        size?: number;
        strokeWidth?: number;
    }

    let {
        value,
        max,
        size = 100,
        strokeWidth = 15
    }: Props = $props();

    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const strokeDashoffset = circumference - (value / max) * circumference;
</script>

<div class="relative inline-flex items-center justify-center">
    <svg height={size} width={size} class="transform -rotate-90">
        <circle
            class="text-muted"
            stroke-width={strokeWidth}
            stroke="currentColor"
            fill="transparent"
            r={radius}
            cx={size / 2}
            cy={size / 2}
        />
        <circle
            class="text-primary"
            stroke-width={strokeWidth}
            stroke-dasharray={circumference}
            stroke-dashoffset={strokeDashoffset}
            stroke-linecap="round"
            stroke="currentColor"
            fill="transparent"
            r={radius}
            cx={size / 2}
            cy={size / 2}
        />
    </svg>
    <span 
        class="absolute font-semibold text-lg" 
    >
        {value*10}%
    </span>
</div>
