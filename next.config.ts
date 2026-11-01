import type { NextConfig } from "next"
import { withPayload } from "@payloadcms/next/withPayload"

const nextConfig: NextConfig = {
  experimental: {
    // Payload admin drawers/uploads call Server Actions from the public origin.
    serverActions: { allowedOrigins: ["quantumatlas.dev"] },
  },
}

export default withPayload(nextConfig)
