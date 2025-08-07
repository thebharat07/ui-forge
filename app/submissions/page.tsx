'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

export default function SubmitPage() {
  const router = useRouter()
  const [image, setImage] = useState<File | null>(null)
  const [liveUrl, setLiveUrl] = useState("")
  const [githubUrl, setGithubUrl] = useState("")
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!image || !liveUrl || !githubUrl) return alert("All fields required")

    const formData = new FormData()
    formData.append("image", image)
    formData.append("liveUrl", liveUrl)
    formData.append("githubUrl", githubUrl)

    setSubmitting(true)
    const res = await fetch("/api/submit", {
      method: "POST",
      body: formData
    })

    const result = await res.json()
    if (res.ok) {
      router.push("/leaderboard")
    } else {
      alert(result.error || "Submission failed")
    }
    setSubmitting(false)
  }

  return (
    <div className="min-h-screen bg-black text-white px-4 py-20">
      <div className="max-w-xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Submit Your Project</h1>
        <form onSubmit={handleSubmit} className="space-y-6" encType="multipart/form-data">
          <div>
            <label className="block mb-1 text-sm">Upload Image *</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files?.[0] || null)}
              required
              className="w-full bg-gray-900 border border-gray-700 text-white p-2 rounded"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm">Live Link *</label>
            <input
              type="url"
              value={liveUrl}
              onChange={(e) => setLiveUrl(e.target.value)}
              required
              className="w-full bg-gray-900 border border-gray-700 text-white p-2 rounded"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm">GitHub Repo *</label>
            <input
              type="url"
              value={githubUrl}
              onChange={(e) => setGithubUrl(e.target.value)}
              required
              className="w-full bg-gray-900 border border-gray-700 text-white p-2 rounded"
            />
          </div>

          <Button type="submit" disabled={submitting} className="w-full">
            {submitting ? "Submitting..." : "Submit"}
          </Button>
        </form>
      </div>
    </div>
  )
}

