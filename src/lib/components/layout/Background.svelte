<div
    class="absolute top-0 left-0 w-full h-full -z-50 overflow-hidden bg-gray-900"
>
    <div class="colors colors--one"></div>
    <div class="colors colors--two"></div>
</div>

<style scoped>
    .colors {
        position: absolute;

        width: 100vw;
        height: 100vw;

        top: 50vh;
        left: 0;

        border-radius: 50%;

        filter: blur(50px);
        opacity: 0.8;

        mix-blend-mode: difference;

        animation-name: funny;
        animation-timing-function: linear;
        animation-iteration-count: infinite;
        animation-duration: 20s;
    }

    .colors.colors--one {
        background: radial-gradient(circle at 0 20%, dodgerblue, transparent),
            radial-gradient(circle at 50% 50%, pink, transparent),
            radial-gradient(circle at 80% 80%, magenta, transparent);
    }

    .colors.colors--two {
        background: radial-gradient(circle at 20% 20%, green, transparent),
            radial-gradient(circle at 50% 50%, royalblue, transparent),
            radial-gradient(circle at 80% 80%, purple, transparent);

        animation-duration: 30s;
        animation-direction: reverse;
    }

    @keyframes funny {
        from {
            transform: rotateZ(0) scale(1.2);
        }

        to {
            transform: rotateZ(360deg) scale(1.2);
        }
    }
</style>
