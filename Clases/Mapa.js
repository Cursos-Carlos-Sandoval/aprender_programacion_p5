/********************************************************************************************************************
 * Mapa.js
 * Copyright (c) 2021 Carlos Sandoval
 * @author Carlos Santiago Sandoval Casallas, https://github.com/CarlosSandoval-03/aprender_programacion_p5
 * Publicado bajo los términos de la licencia MIT, consulte: https://opensource.org/licenses/MIT
 *
 * JS Docs basados en: https://github.com/objetos/p5.quadrille.js/blob/main/p5.quadrille.js
 * y: https://stackoverflow.com/questions/41715994/how-to-document-ecma6-classes-with-jsdoc
 ********************************************************************************************************************/

class Mapa {
	/**
	 * @const {String} [Color por defecto del vacio]
	 */
	static COLOR_VACIO = "#020916";

	/**
	 * @const {String} [Color por defecto del suelo]
	 */
	static COLOR_SUELO = "#004373";

	/**
	 * @const {String} [Color por defecto del borde de la cuadricula]
	 */
	static COLOR_BORDE = "#0da2c2";

	/**
	 * @const {Number} [Tamaño por defecto de cada celda de la cuadricula]
	 */
	static TAMANO_CELDA = 35;

	/**
	 * @const {Number} [Cantidad de filas por defecto - Y]
	 */
	static FILAS = 5;

	/**
	 * @const {Number} [Cantidad de columnas por defecto - X]
	 */
	static COLUMNAS = 12;

	/**
	 * @const {Number} [Cantidad de celdas vacias por mapa]
	 */
	static CELDAS_VACIAS = 25;

	/**
	 * @const {Number} [Valor del piso por defecto]
	 */
	static VALOR_SUELO = 0;

	/**
	 * @const {Number} [Valor del vacio por defecto]
	 */
	static VALOR_VACIO = 1;

	/**
	 * Esta funcion indica si la celda es considerada como suelo o no (0 = Suelo)
	 * Manejo de funciones Arrow: https://javascript.info/arrow-functions-basics
	 * Manejo (mas profundo): https://javascript.info/arrow-functions
	 * @static
	 * @param {Number} celda es el contenido del arreglo o la cuadricula
	 * @param {Number | Boolean} piso es el indicador que tiene el juego para reconocer el suelo
	 * @returns {Boolean} Indica si la casilla es suelo o no
	 */
	static esPiso = (celda) => (celda === Mapa.VALOR_SUELO ? true : false);

	/**
	 * Permite construir un tablero en base a distintos parametros:
	 * 1. Matriz Nula
	 * 2. Cuadricula (instancia de Quadrille)
	 * 3. Ancho y Alto
	 *
	 * En caso de ingresar valores invalidos la cuadricula sera indefinida y marcara
	 * el error
	 *
	 * Este tipo de constructores permite una mayor flexibilidad al ejecutar el programa
	 * Referencia: https://github.com/objetos/p5.quadrille.js/blob/main/p5.quadrille.js
	 * @constructor
	 * @see Quadrille
	 */
	constructor() {
		if (arguments.length === 1) {
			if (Array.isArray(arguments[0])) {
				this._cuadricula = createQuadrille(arguments[0]);
			} else if (arguments[0] instanceof Quadrille) {
				this._cuadricula = arguments[0];
			}
		} else if (
			arguments.length === 2 &&
			typeof arguments[0] === "number" &&
			typeof arguments[1] === "number"
		) {
			this._cuadricula = createQuadrille(arguments[0], arguments[1]);
		} else {
			console.error(
				"PARAMETROS INVALIDOS\nLEA LA DOCUMENTACION: https://github.com/CarlosSandoval-03/aprender_programacion_p5"
			);
			this._cuadricula = undefined;
		}
		/**
		 * Comprobamos que la cuadricula sea instancia de Quadrille para usar sus metodos.
		 * Llenamos la cuadricula de 1 que representa terreno habilitado, y generamos de forma
		 * aleatoria la cantidad de celdas vacias dandoles el valor de 0
		 */
		if (this.cuadricula instanceof Quadrille) {
			this.cuadricula.rand(Mapa.CELDAS_VACIAS, 1);
		}
	}
	/** Metodos GET y SET de la cuadricula que representa el mapa */
	get cuadricula() {
		return this._cuadricula;
	}
	set cuadricula(nuevaCuadricula) {
		nuevaCuadricula instanceof Quadrille
			? (this._cuadricula = nuevaCuadricula)
			: console.error("La nueva cuadricula debe ser instancia de Quadrille");
	}

	dibujar() {
		let mapaGrafico = this._mapaGrafico();
		drawQuadrille(mapaGrafico, {
			cellLength: Mapa.TAMANO_CELDA,
			outline: Mapa.COLOR_BORDE,
			board: true,
		});
	}

	/**
	 * Esta funcion remplaza los valores definidos por sus respectivos colores
	 * @private
	 * @returns {Quadrille} Instancia de Quadrille que ya no posee valores booleanos
	 * si no los colores respectivos
	 */
	_mapaGrafico() {
		let mapaGrafico = this.cuadricula.clone();
		mapaGrafico.replace(Mapa.VALOR_SUELO, color(Mapa.COLOR_SUELO));
		mapaGrafico.replace(Mapa.VALOR_VACIO, color(Mapa.COLOR_VACIO));
		return mapaGrafico;
	}

	/** Retorna la cuadricula como matriz */
	matriz() {
		return this.cuadricula.toMatrix();
	}
}