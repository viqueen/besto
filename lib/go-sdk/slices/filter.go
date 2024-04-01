package slices

// Filter returns a new slice containing only the elements of the original slice for which the predicate returns true.
func Filter[TYPE any](items []TYPE, predicate func(TYPE) bool) []TYPE {
	result := make([]TYPE, 0, len(items))
	for _, value := range items {
		if predicate(value) {
			result = append(result, value)
		}
	}
	return result
}
