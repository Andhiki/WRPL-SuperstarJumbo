import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { useRouter } from "next/router"
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink } from "./navigation-menu"
import Link from "next/link"

// Mock next/router
jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}))

describe("NavigationMenu", () => {
  const mockPush = jest.fn()
  
  beforeEach(() => {
    // Reset mocks before each test
    mockPush.mockClear()
    useRouter.mockReturnValue({
      push: mockPush,
      pathname: "/", // Add other router properties you might need
    })
  })

  it("menampilkan link navigasi dengan benar", () => {
    render(
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <Link href="/home" legacyBehavior passHref>
              <NavigationMenuLink>Home</NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/about" legacyBehavior passHref>
              <NavigationMenuLink>About</NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    )

    expect(screen.getByText("Home")).toBeInTheDocument()
    expect(screen.getByText("About")).toBeInTheDocument()
  })

  it("navigasi membawa user ke halaman yang benar saat diklik", async () => {
    const user = userEvent.setup()
    
    render(
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <Link href="/contact" legacyBehavior passHref>
              <NavigationMenuLink>Contact</NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    )

    const contactLink = screen.getByText("Contact")
    await user.click(contactLink)

    // Verify the router push was called with the correct path
    expect(mockPush).toHaveBeenCalledTimes(1)
    expect(mockPush).toHaveBeenCalledWith("/contact")
  })
})