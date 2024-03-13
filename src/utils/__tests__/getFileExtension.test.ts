import { getExtension } from "../getFileExtension"

describe("utils: getExtension", () => {
	it("should return the correct extension for a URL with an extension", () => {
		const url = "http://example.com/path/file.txt"
		const extension = getExtension(url)
		expect(extension).toBe(".txt")
	})

	it("should return the correct extension for a URL with multiple dots", () => {
		const url = "http://example.com/path/file.tar.gz"
		const extension = getExtension(url)
		expect(extension).toBe(".gz")
	})

	it("should return the correct extension for a URL with query parameters", () => {
		const url = "http://example.com/path/file.txt?param=value"
		const extension = getExtension(url)
		expect(extension).toBe(".txt")
	})

	it("should return the correct extension for a URL with a fragment", () => {
		const url = "http://example.com/path/file.txt#fragment"
		const extension = getExtension(url)
		expect(extension).toBe(".txt")
	})
})
