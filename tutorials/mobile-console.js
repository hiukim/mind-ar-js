(function (root, factory) {
	if (typeof define === 'function' && define.amd) {
		define([], factory);
	} else if (typeof exports === 'object') {
		module.exports = factory();
	} else {
		root.mobileConsole = factory();
	}
})(this, function () {

	var containerHtml = '' + 
	'<div id="jsmc-collapse"></div>' +
	'<div id="jsmc-clear">&#xd7</div>' +
	'<div id="jsmc-commands">&#x2261</div>' +
	'<div id="jsmc-commands-container"></div>' +	
	'<div id="jsmc-content">' +
	'	<input id="jsmc-button" type="button" value="Run"/>' +
	'	<div id="jsmc-log">' +
	'	</div>' +
	'	<div id="jsmc-input-container">' +
	'		<input id="jsmc-input" type="text" placeholder="type your js here"/>' +
	'	</div>' +
	'</div>' +
	'';

	var logElementHtml = '' +
	'	<div class="jsmc-log-text"></div>' +
	'	<div class="jsmc-log-target"></div>' +
	'';

	var mobileConsole = {
		props: {
			showOnError: false,
			proxyConsole: true,
			isCollapsed: false,
			catchErrors: true
		},

		init: function(){
			this.commandsHash = [];
			if (!this.initialized){
				if (this.props.catchErrors){
					this.bindErrorListener();
				}
				this.initializeContainers();
				this.bindListeners();
				this.initialized = true;

				if (this.props.proxyConsole){
					this.decorateConsole();
				} else {
					this.undecorateConsole();
				}
			}
		},

		options: function(options){
			for (var i in options){
				if (typeof this.props[i] !== 'undefined'){
					this.props[i] = options[i];
				}
			}
			this.init();
		},

		show: function(options){
			var el = document.getElementById('js-mobile-console');
			if (!el){
				this.init();
			}
			this.$el.container.style.display = 'block';

			if (options && options.expand){
				this.toggleCollapsed(false);
			}
		},

		hide: function(){
			if (this.$el && this.$el.container){
				this.$el.container.style.display = 'none';
			}
		},

		commands: function(commands){
			if (typeof commands !== 'object'){
				throw new Error('mobileConsole: commands method accepts object, not ' + typeof commands);
			}
			this.commandsHash = commands;
			this.commandsHashLength = 0;
			for (var i in commands){
				if (commands.hasOwnProperty(i)){
					this.commandsHashLength++;
				}
			}
			if (this.commandsHashLength){
				this.populateCommandsContainer_();
			}
		},

		populateCommandsContainer_: function(){
			var self = this;
			for (var i in this.commandsHash){
				if (this.commandsHash.hasOwnProperty(i)){					
					var commandEl = document.createElement('div');
					commandEl.className = 'jsmc-command';
					commandEl.innerHTML = i;
					commandEl.command = this.commandsHash[i];
					
					var commandElContainer = document.createElement('div');
					commandElContainer.className = 'jsmc-command-wrapper';

					commandElContainer.appendChild(commandEl);
					this.$el.commandsContainer.appendChild(commandElContainer);
				}
			}

			if (!this.commandsPopulated){
				this.$el.commandsContainer.addEventListener('click', function(event){
					if (event.target.className === 'jsmc-command'){
						var command = event.target.command;
						var res = self.eval(command);
						self.logValue(command, false, true);
						self.logValue(res.text, res.error);
					}
				});
			}

			this.commandsPopulated = true;
		},
		
		destroy: function(){
			var el = document.getElementById('js-mobile-console');
			el.parentNode.removeChild(el);
		},

		initializeContainers: function(options){
			this.$el = {};
			el = this.$el.container = document.createElement('div');
			el.id = 'js-mobile-console';
			el.innerHTML = containerHtml;
			el.style.display = 'none';
			document.body.appendChild(el);

			this.$el.input = document.getElementById('jsmc-input');
			this.$el.button = document.getElementById('jsmc-button');
			this.$el.log = document.getElementById('jsmc-log');
			this.$el.content = document.getElementById('jsmc-content');
			this.$el.collapseControl = document.getElementById('jsmc-collapse');
			this.$el.clearControl = document.getElementById('jsmc-clear');
			this.$el.commandsControl = document.getElementById('jsmc-commands');
			this.$el.commandsContainer = document.getElementById('jsmc-commands-container');

			if (this.props.isCollapsed){
				this.$el.content.style.display = 'none';
				this.$el.clearControl.style.display = 'none';
				this.$el.commandsControl.style.display = 'none';
				this.isCollapsed = true;
				this.$el.collapseControl.innerHTML = '&#9650;';
			} else {
				this.$el.collapseControl.innerHTML = '&#9660;';				
			}
		},

		toggleCollapsed: function(toBeCollapsed){
			this.isCollapsed = typeof toBeCollapsed === 'boolean' ? toBeCollapsed : !this.isCollapsed;
			var display = this.isCollapsed ? 'none' : 'block';
			this.$el.content.style.display = display;
			this.$el.collapseControl.innerHTML = this.isCollapsed ? '&#9650;' : '&#9660;';
			if (this.isCollapsed){
				this.$el.clearControl.style.display = 'none';
				this.$el.commandsControl.style.display = 'none';
			} else {
				this.$el.clearControl.style.display = 'inline-block';
				if (this.commandsHashLength){
					this.$el.commandsControl.style.display = 'inline-block';
				}
			}
		},

		bindListeners: function(){
			var self = this;
			this.$el.collapseControl.addEventListener('click', function(){
				self.toggleCollapsed();
			});

			this.$el.clearControl.addEventListener('click', function(){
				self.clearLogs();
			});

			this.$el.button.addEventListener('click', function(){
				logValue();
			});

			this.$el.input.addEventListener('keyup', function(e){
				if (e.which === 13){
					logValue();
				}
			});

			this.$el.commandsControl.addEventListener('click', function(){
				self.toggleCommands();
			});

			function logValue(){
				var val = self.$el.input.value;
				var res = self.eval(val);
				self.logValue(res.text, res.error);
			}
		},

		toggleCommands: function(){
			this.commandsShown = !this.commandsShown;
			this.$el.commandsContainer.style.display = this.commandsShown ? 
				'inline-block' : 'none';
		},

		eval: function(command){
			var text;
			var error;
			try {
				text = window.eval(command);
			} catch (e){
				text = e.message;
				error = true;
			}
			if (JSON && JSON.stringify){
				try{
					text = JSON.stringify(text);
				} catch(e){
					text = e.message;
					error = true;					
				}
			}
			return {
				text: text,
				error: error
			};
		},

		clearLogs: function(){
			this.$el.log.innerHTML = '';
		},

		bindErrorListener: function(){
			var self = this;
			window.onerror = function(errorMessage, file, lineNumber, columnNumber){
				if (self.props.showOnError){
					self.show({expand: true});
				}
				var error = file + ':' + lineNumber + (columnNumber ? (':' + columnNumber) : '');
				self.logValue(errorMessage, error);
			};
		},

		appendLogEl: function(el){
			this.$el.log.appendChild(el);
			this.$el.log.scrollTop = this.$el.log.scrollHeight;
		},

		decorateConsole: function(){
			var self = this;
			if (this.consoleDecorated){
				return;
			}
			self.nativeConsole = {};
			this.consoleDecorated = true;
			if (window.console){
				decorateConsoleMethod('log');
				decorateConsoleMethod('info');
				decorateConsoleMethod('warn');
				decorateConsoleMethod('error');
			}

			function decorateConsoleMethod(methodName){
				if (window.console[methodName]){
					self.nativeConsole[methodName] = window.console[methodName];
					window.console[methodName] = function(){
						var args = [].slice.call(arguments);
						self.nativeConsole[methodName].apply(window.console, args);
						var res = stringifyComponents(args);
						self.logValue(res.text, res.error);
					};
				}
			}

			function stringifyComponents(inputArgs){
				var args = [].slice.call(inputArgs);
				if (JSON && JSON.stringify){
					try{
						for (var i = 0; i < args.length; i++){
							if (typeof args[i] === 'string'){
								args[i] = args[i].replace('\n', '<br>');

								var res = handleStyles(i, args);
								args[i] = res.string;
								args.splice(i + 1, res.nextElement - 1);
								continue;
							} else {
								var containsUndefined = false;
								args[i] = JSON.stringify(args[i], function(key, value) { 
									//preserve undefined in output after stringify
									if (value === undefined) { 
										containsUndefined = true;
										return '$$_|_undefined_|_$$'; 
									} 
									return value; 
								});

								if (containsUndefined){
									args[i] = args[i].replace('"$$_|_undefined_|_$$"', 'undefined');
								}
							}
						}
					} catch(e){
						args = [e.message];
						var error = true;
					}
				} 

				function handleStyles(index, args){
					var blocks = args[index].split('%c');
					var string = args[index];
					var nextElement = index + 1;
					if (blocks.length > 1){
						var i = 1;
						while (i < blocks.length){
							var style = args[nextElement] || "";
							var styleString = '<span style="' + style  + '">'
							blocks.splice(i, 0, styleString);
							blocks.splice(i + 2, 0, '</span>');
							nextElement++;
							i = i + 3;
						}
						string = blocks.join('');
					}
					return {string: string, nextElement: nextElement}
				}

				return {text: args.join(' '), error: error};
			}
		}, 

		undecorateConsole: function(){
			var self = this;
			if (this.consoleDecorated){
				undecorateConsoleMethod['log'];
				undecorateConsoleMethod['info'];
				undecorateConsoleMethod['warn'];
				undecorateConsoleMethod['error'];
			}

			function undecorateConsoleMethod(methodName){
				window.console[methodName] = function(){
					var args = [].slice.call(arguments);
					self.nativeConsole[methodName].apply(window.console, args);
				};
			}
		},

		logValue: function(value, error, command){			
			var logEl = document.createElement('div');
			logEl.className = 'jsmc-log-el';
			logEl.innerHTML = logElementHtml;

			if (error){
				logEl.className += ' jsmc-log-error';
			}

			if (command){
				logEl.className += ' jsmc-log-command';
			}

			var logTextEl = logEl.getElementsByClassName('jsmc-log-text')[0];
			logTextEl.innerHTML = value;

			if (typeof error === 'string'){
				var logTargetEl = logEl.getElementsByClassName('jsmc-log-target')[0];
				logTargetEl.innerHTML = error;
			}

			this.appendLogEl(logEl);
		}
	};

	return mobileConsole;

});
