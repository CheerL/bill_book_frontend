import { useRouter } from './router'

const useLink = path => {
    const router = useRouter()
    const handleLink = () => {
        if (path) {
            router.history.push(path)
        } else {
            router.history.goBack()
        }
    }
    return handleLink
}

export default useLink