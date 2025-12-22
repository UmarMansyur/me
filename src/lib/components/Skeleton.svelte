<script lang="ts">
  interface Props {
    class?: string;
    variant?: 'text' | 'rect' | 'circle';
    width?: string;
    height?: string;
  }

  let { class: className = '', variant = 'rect', width, height }: Props = $props();

  const variantClasses = {
    text: 'h-4 w-full rounded',
    rect: 'h-32 w-full rounded-xl',
    circle: 'rounded-full aspect-square'
  };
</script>

<div
  class="animate-pulse bg-gray-200/50 backdrop-blur-sm {variantClasses[variant]} {className}"
  style:width
  style:height
></div>
