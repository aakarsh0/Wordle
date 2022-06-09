<main>
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
		<mask id="cutout">
			<rect x="0" y="0" width="100%" height="100%" fill="#fff" />
			<path fill="#000" id="cutout-path" d="M0 -11l70 51c7 5 7 15 0 20l-70 51z" />
		</mask>
		<g mask="url(#cutout)">
			<path
				id="cog"
				fill-rule="evenodd"
				d="M53.706 0h-7.41l-2.085 5.537-5.878 1.17-4.044-4.32-6.845 2.835.192 5.914-4.983 3.33-5.39-2.443-5.24 5.24 2.44 5.4-3.33 4.983-5.913-.195L2.4 34.287l4.318 4.046-1.17 5.878-5.538 2.083v7.41l5.537 2.085 1.17 5.878L2.4 65.713l2.835 6.845 5.913-.195 3.33 4.983-2.44 5.4 5.24 5.24 5.39-2.443 4.983 3.33-.192 5.914 6.845 2.835 4.044-4.32 5.878 1.17L46.297 100h7.41l2.083-5.538 5.878-1.17 4.046 4.318 6.845-2.835-.195-5.913 4.983-3.33 5.4 2.44 5.24-5.24-2.443-5.39 3.33-4.983 5.914.192 2.835-6.845-4.32-4.044 1.17-5.878L100 53.703v-7.41l-5.538-2.083-1.17-5.878 4.32-4.044-2.835-6.845-5.914.192-3.33-4.983 2.443-5.39-5.24-5.24-5.4 2.44-4.983-3.33.195-5.913-6.845-2.835-4.046 4.318-5.878-1.17L53.706 0zM50 83.213c18.343 0 33.214-14.87 33.214-33.213S68.344 16.787 50 16.787 16.787 31.657 16.787 50 31.657 83.213 50 83.213z"
			/>
		</g>
		<path id="m" d="M7.5 24v52h7v-39l13 39l13 -39v39h7v-52h-10l-10 32l-10 -32z" />
	</svg>
	<h1>Mikha's Portfolio Website Coming Soon</h1>
	<div class="projects">
		<div>
			<h2>Things I've Made</h2>
			<div class="links">
				<a href="https://mikhad.github.io.wordle">Wordle+</a>
				<a href="https://github.com/MikhaD/nfr-bot">Discord bot</a>
				<a href="https://mikhad.github.io/flexbox-sandbox/">Flexbox Sandbox</a>
				<a href="https://mikhad.github.io/what-the-weather">What the Weather</a>
				<a href="https://mikhad.github.io/Color-game/">Color Game</a>
				<a href="https://github.com/MikhaD/Truth-table-generator">Truth Table Generator</a>
				<a href="https://github.com/MikhaD/cobweb">Cobweb diagram maker</a>
				<a href="https://peacediscipline.com/">My mothers website</a>
				<!-- <a href="pages/MorseMangler">Morse Code translator</a>
				<a href="pages/Lootrun helper/dist/index.html">Lootrun comparison tool</a>
				<a href="pages/Drawing Garden/index.html">drawing.garden imitation</a>
				<a href="pages/svgBalloon.html">Balloon comparison</a>
				<a href="pages/flipCardTest.html">Flip card test</a> -->
			</div>
		</div>
		<div>
			<h2>Things I'm Working on</h2>
			<div class="links">
				<a href="https://mikhad.github.io/minesweeper">Minesweeper</a>
				<a href="https://mikhad.github.io/graph-builder">Graph Builder</a>
				<a href="https://github.com/MikhaD/Imerge">Imerge</a>
				<a href="https://github.com/MikhaD/movie-database">My Movie Database</a>
				<a href="https://github.com/MikhaD/edit-list-on-label">GitHub Action</a>
				<span>This website</span>
			</div>
		</div>
	</div>
</main>

<style lang="scss">
	main {
		text-align: center;
		max-width: var(--page-width);
		margin: auto;
		padding: 2rem;
	}
	.projects {
		display: grid;
		grid-template-columns: 1fr 1fr;
	}
	.links {
		& * {
			color: var(--fg-primary);
			display: block;
		}
	}
	svg {
		height: 30rem;
		display: block;
		margin: auto;
		max-width: 100%;
		fill: var(--fg-primary);
	}

	#cog {
		animation: cog 2s linear infinite;
		transform-origin: center;
		transform-box: fill-box;
	}

	@keyframes cog {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(90deg);
		}
	}

	@media (max-width: 500px) {
		main {
			text-align: left;
		}
		.projects {
			grid-template-columns: 1fr;
		}
	}
</style>
