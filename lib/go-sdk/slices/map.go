package slices

// Map applies a function to each element of a slice and returns a new slice with the results.
func Map[TYPE interface{}, RETURN interface{}](items []TYPE, transform func(TYPE) RETURN) []RETURN {
	result := make([]RETURN, len(items))
	for index, value := range items {
		result[index] = transform(value)
	}
	return result
}
