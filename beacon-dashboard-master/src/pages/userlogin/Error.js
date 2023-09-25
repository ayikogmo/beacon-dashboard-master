export default function Error() {

	const data = {
		title: "401 - Unauthorized",
		content: "You do not have access to the requested page.",
		destination: "/",
		label: "Back Home"
	}

	return(
			<Banner data={data} />
		)

}
