var bf_interpreter = {
  code: ">++++++[<++++++++++>-]<+++++",
  bracket_stack: [],
  current_pointer: 0,
  cells: [0,0,0,0,0],
  cells_pointer: 0,
  output: "",

  tick: function() {
    var current = this.code.charCodeAt(this.current_pointer);

    if (current === "+".charCodeAt(0)) {
      if (this.cells[this.cells_pointer] < 255) {
	this.cells[this.cells_pointer]++;
      }
      this.current_pointer++;
    } else if (current === "-".charCodeAt(0)) {
      if (this.cells[this.cells_pointer] > 0) {
	this.cells[this.cells_pointer]--;
      }
      this.current_pointer++;
    } else if (current === ">".charCodeAt(0)) {
      if (this.cells_pointer < this.cells.length-1) {
	this.cells_pointer++;
      }
      this.current_pointer++;
    } else if (current === "<".charCodeAt(0)) {
      if (this.cells_pointer > 0) {
	this.cells_pointer--;
      }
      this.current_pointer++;
    } else if (current === "[".charCodeAt(0)) {
      if (this.cells[this.cells_pointer] === 0) {
	this.skip_loop();
      } else {
	this.brackets_stack.push(this.current_pointer);
	this.current_pointer++;
      }
    } else if (current === "]".charCodeAt(0)) {
      if (this.cells[this.cells_pointer] === 0) {
	this.brackets_stack.splice(-1);
	this.current_pointer++;
      } else {
	this.current_pointer = this.brackets_stack.slice(-1)[0];
      }
    } else if (current === ".".charCodeAt(0)) {
      this.output += String.fromCharCode(this.cells[this.current_pointer]);
      this.current_pointer++;
    }

    console.log(this);
  },

};
