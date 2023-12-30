import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import { CircularProgress, CircularProgressProps } from "@mui/material"

function CircularProgressWithLabel(
  props: CircularProgressProps & { value: number }
) {
  return (
    <div className="">
      <Box sx={{ position: "relative", display: "inline-flex" }}>
        <CircularProgress size="100px" variant="determinate" {...props} />
        <Box
          sx={{
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            position: "absolute",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography variant="h5" component="div" color="white">{`${Math.round(
            props.value
          )}%`}</Typography>
        </Box>
      </Box>
    </div>
  )
}

export default CircularProgressWithLabel
