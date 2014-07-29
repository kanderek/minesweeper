describe("Grid", function(){
	
	var grid;

	beforeEach(function(){
		grid = new Grid(8,8);
	});

	describe("construction...", function(){
		it("should have property rowSize equal to 8", function(){
			expect(grid.rowSize).toEqual(8);
		});

		it("should have property columnSize equal to 8", function(){
			expect(grid.columnSize).toEqual(8);
		});

		it("should have an empty grid", function(){
			expect(grid.grid[1]).toEqual('-');
			expect(grid.grid[32]).toEqual('-');
			expect(grid.grid[64]).toEqual('-');
		});
	});

	describe("nearestNeighbors...should return indices of nearest neighbers", function(){
		it("should return {3: 2, 4: 10, 5: 9} for tile location of 1", function(){
			expect(grid.nearestNeighbors(1)).toEqual({3: 2, 4: 10, 5: 9});
		});
	});

	describe("tileValue...should set or return value of a tile at a specific location", function(){
		it("should return 0 at location 24", function(){
			expect(grid.tileValue(24)).toEqual('-');
		});

		it("should return 12 at location 24 when value 12 is sent to function", function(){
			expect(grid.tileValue(24, 12)).toEqual(12);
			expect(grid.tileValue(24)).toEqual(12);
		});
	});

});